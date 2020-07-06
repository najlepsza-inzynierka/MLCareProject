from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.prediction_dao import PredictionDAO
from ..database.visit_dao import VisitDAO
from ..machine_learning.predict import predict, result_map
from ..model.exceptions import PredictionException
from ..model.prediction import Prediction
from ..validate import expect_mime, json_body, mk_error

prediction_bp = Blueprint('predictions', __name__)


@app.route("/api/visit/<visit_id>/make_prediction", methods=["POST"])
@expect_mime('application/json')
@json_body
def add_prediction(visit_id):
    body = g.body

    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    prediction_data = {
        'visitId': visit_id,
        'disease': body.get('disease', None),
        'date': datetime.utcnow(),
        'features': body.get('features')}

    if not prediction_data.get('disease'):
        return mk_error('Cannot make prediction without disease name', 500)

    prediction = Prediction(prediction_data)
    try:
        prediction = predict(prediction)
    except PredictionException as exc:
        return mk_error(exc.args, 500)

    prediction_dao = PredictionDAO()
    prediction_id = prediction_dao.insert_one(prediction)
    prediction_db = prediction_dao.find_one_by_id(prediction_id)

    # front end should get readable data
    prediction_front = Prediction(prediction_db.data)
    class_map = result_map[prediction_front.model]
    new_pred = {class_map[int(class_num)]: prob for (class_num, prob) in
                prediction_front.probability_map.items()}
    prediction_front.probability_map = new_pred
    prediction_front.predicted_class = class_map[
        int(prediction_front.predicted_class)]

    return jsonify(prediction_front.data)


@app.route("/api/predictions/<visit_id>", methods=["GET"])
def get_all_predictions_by_visit_id(visit_id):
    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    dao = PredictionDAO()
    predictions = dao.find_all_predictions_by_visit_id(visit_id)
    result = []
    for prediction in predictions:
        result.append(prediction.data)
    return jsonify(result)


@app.route("/api/prediction/<prediction_id>", methods=["GET"])
def get_prediction(prediction_id):
    dao = PredictionDAO()
    prediction = dao.find_one_by_id(prediction_id)
    if not prediction:
        return mk_error('Prediction not in database', 404)
    # front end should get readable data
    prediction_front = Prediction(prediction.data)
    class_map = result_map[prediction_front.model]
    new_pred = {class_map[int(class_num)]: prob for (class_num, prob) in
                prediction_front.probability_map.items()}
    prediction_front.probability_map = new_pred
    prediction_front.predicted_class = class_map[
        int(prediction_front.predicted_class)]
    return jsonify(prediction_front.data)


@app.route('/api/predictions/delete_prediction/<prediction_id>', methods=[
    'DELETE'])
def delete_prediction(prediction_id):
    prediction_dao = PredictionDAO()
    prediction_dao.delete_one_by_id(prediction_id)
    return jsonify({"confirmation": "OK"})
