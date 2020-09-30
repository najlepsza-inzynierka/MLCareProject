from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.diseases_dao import DiseaseDAO

from ..database.prediction_dao import PredictionDAO
from ..database.visit_dao import VisitDAO
from ..machine_learning.predict import predict
from ..model.exceptions import PredictionException
from ..model.prediction import Prediction
from ..validate import expect_mime, json_body, mk_error

diseases_bp = Blueprint('diseases', __name__)


@app.route('/api/diseases', methods=['GET'])
def get_diseases():
    dao = DiseaseDAO()
    result = dao.find_diseases()

    return jsonify(result)


@app.route('/api/diseases/new_latest', methods=['POST'])
def add_latest():
    """
    makes new latest disease database (e.g. for changed api version)
    """
    dao = DiseaseDAO()
    dao.add_disease_db()

    return jsonify({"confirmation": "OK"})


@app.route('/api/diseases/add_disease', methods=['PUT'])
@expect_mime('application/json')
@json_body
def add_disease():
    """
    adds disease to latest diseases database
    """
    body = g.body

    disease = body.get('name')

    dao = DiseaseDAO()
    dao.add_disease('latest', disease)

    return jsonify({'confirmation': 'OK'})
