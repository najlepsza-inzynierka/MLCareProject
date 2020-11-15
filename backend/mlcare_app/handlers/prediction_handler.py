from datetime import datetime

from flask import jsonify, Blueprint, g

from .. import app
from ..database.prediction_dao import PredictionDAO
from ..database.visit_dao import VisitDAO
from ..machine_learning.predict import predict
from ..model.exceptions import PredictionException, PredictionFeatureException
from ..model.prediction import Prediction, STATUS_SUCCESS, STATUS_FAILED
from ..validate import expect_mime, json_body, mk_error, check_token

prediction_bp = Blueprint('predictions', __name__)


@app.route('/api/visit/<visit_id>/make_prediction', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_token
def add_prediction(visit_id):
    """
    {"disease": "disease1",                   disease to predict
     "features": [
            {"name": "feature1",
             "value": value
             },
             {"name": "feature2",
             ...}
             ],                                 all features to predict from
                                                (value may be string)
    }

    @:return prediction data in json format
    """
    body = g.body
    user = g.user

    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    prediction_data = {
        'visitId': visit_id,
        'disease': body.get('disease', None),
        'date': datetime.utcnow(),
        'features': body.get('features', [])
    }

    if not prediction_data.get('disease'):
        return mk_error('Cannot make prediction without disease name', 500)

    prediction = Prediction(prediction_data)
    try:
        prediction.filter_features()
    except PredictionFeatureException as exc:
        return mk_error(exc.args, 409)
    try:
        prediction = predict(prediction)
        prediction.added_by = user.id
    except PredictionException as exc:
        return mk_error(exc.args, 500)

    prediction_dao = PredictionDAO()
    prediction.prepare_to_db()
    prediction_dao.insert_one(prediction)
    prediction.status = STATUS_SUCCESS

    return jsonify(prediction.data)


@app.route('/api/visit/<visit_id>/make_multi_prediction', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_token
def add_multi_prediction(visit_id):
    """
    {"diseases": ["disease1", "disease2"],      diseases to predict
     "features": [
            {"name": "feature1",
             "value": value
             },
             {"name": "feature2",
             ...}
             ],                                 all features to predict from
                                                (value may be string)
    }

    @:return
    {
        "disease_name1": disease1_prediction,
        "disease_name2": disease2_prediction
    }
    """
    body = g.body
    user = g.user

    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    predictions_data = {
        'diseases': body.get('diseases', []),
        'date': datetime.utcnow(),
        'features': body.get('features', [])
    }

    if not predictions_data.get('diseases'):
        return mk_error('Cannot make prediction without disease name', 500)

    predictions_result = {}

    for disease in predictions_data['diseases']:
        prediction_data = {
            'visitId': visit_id,
            'disease': disease,
            'date': predictions_data['date'],
            'features': predictions_data['features']
        }
        prediction = Prediction(prediction_data)
        prediction.added_by = user.id
        try:
            prediction.filter_features()
        except PredictionFeatureException:
            prediction.predicted_class = ('Not predicted. Lack of obligatory '
                                          'features.')
            prediction.status = STATUS_FAILED
            predictions_result[prediction.disease] = prediction.data
            continue
        try:
            prediction = predict(prediction)
        except PredictionException:
            prediction.predicted_class = ('Not predicted. There is no model '
                                          'for this disease.')
            prediction.status = STATUS_FAILED
            predictions_result[prediction.disease] = prediction.data
            continue

        prediction_dao = PredictionDAO()
        prediction.prepare_to_db()
        prediction_dao.insert_one(prediction)

        prediction.status = STATUS_SUCCESS
        predictions_result[prediction.disease] = prediction.data

    return jsonify(predictions_result)


@app.route('/api/predictions/<visit_id>', methods=['GET'])
@check_token
def get_all_predictions_by_visit_id(visit_id):
    """
    :param visit_id: visit id in which predictions are
    :return: list of prediction data
    """
    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    dao = PredictionDAO()
    predictions = dao.find_all_predictions_by_visit_id(visit_id)
    result = [prediction.data for prediction in predictions]
    return jsonify({"predictions": result})


@app.route('/api/prediction/<prediction_id>', methods=['GET'])
@check_token
def get_prediction(prediction_id):
    """
    :param prediction_id: prediction database id
    :return: prediction data in json format
    """
    dao = PredictionDAO()
    prediction = dao.find_one_by_id(prediction_id)
    if not prediction:
        return mk_error('Prediction not in database', 404)
    # front end should get readable data
    prediction_front = Prediction(prediction.data)
    return jsonify(prediction_front.data)


@app.route('/api/prediction/patient/<patient_id>', methods=['GET'])
@check_token
def get_prediction_by_patient_id(patient_id):
    """
    :param patient_id: patient database id
    :return: list of prediction data in json format
    """
    visits_dao = VisitDAO()
    visits = visits_dao.find_all_visits_by_patient_id(patient_id)

    prediction_dao = PredictionDAO()
    all_predictions = []
    for visit in visits:
        all_predictions.extend(
            prediction_dao.find_all_predictions_by_visit_id(visit.id))

    result = [prediction.data for prediction in all_predictions]
    return jsonify({"predictions": result})


@app.route('/api/predictions/delete_prediction/<prediction_id>', methods=[
    'DELETE'])
@check_token
def delete_prediction(prediction_id):
    prediction_dao = PredictionDAO()
    prediction_dao.delete_one_by_id(prediction_id)
    return jsonify({'confirmation': 'OK'})
