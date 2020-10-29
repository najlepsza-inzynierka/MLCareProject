import os
from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.exam_dao import ExamDAO
from ..database.patient_dao import PatientDAO
from ..database.prediction_dao import PredictionDAO
from ..database.visit_dao import VisitDAO
from ..model.exam import Exam
from ..model.visit import Visit
from ..validate import expect_mime, json_body, mk_error, check_token

visit_bp = Blueprint('visits', __name__)


# everywhere patient.id not patient.patientId
@app.route("/api/visits/<patient_id>", methods=["GET"])
@check_token
def get_all_visits_by_patient_id(patient_id):
    dao = PatientDAO()
    patient = dao.find_one_by_id(patient_id)
    if not patient:
        return mk_error('Patient not in database', 404)

    dao = VisitDAO()
    visits = dao.find_all_visits_by_patient_id(patient_id)
    result = [visit.prepare_to_send().data for visit in visits]
    return jsonify(result)


@app.route("/api/visit/<visit_id>", methods=["GET"])
@check_token
def get_visit(visit_id):
    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)

    visit.date = str(visit.date)
    visit.prepare_to_send()
    return jsonify(visit.data)


@app.route("/api/patient/<patient_id>/add_visit", methods=["POST"])
@expect_mime('application/json')
@json_body
@check_token
def add_visit(patient_id):
    body = g.body
    user = g.user

    visit_data = {
        'patientId': patient_id,
        'doctorId': user.id,
        'doctorName': f'{user.first_name} {user.last_name}, {user.title}',
        'date': datetime.utcnow()
    }

    visit = Visit(visit_data)
    visit_dao = VisitDAO()
    visit_id = visit_dao.insert_one(visit)

    exams = body.get('exams', None)
    if exams:
        exam_dao = ExamDAO()
        exams_db = [Exam(exam, visit_id=visit_id) for exam in exams]
        exam_dao.insert_many(exams_db)

    return jsonify({"confirmation": "OK",
                    "new_id": ObjectId(visit_id)})


@app.route('/api/visits/delete_visit/<visit_id>', methods=['DELETE'])
@check_token
def delete_visit(visit_id):
    visit_dao = VisitDAO()
    visit_dao.delete_one_by_id(visit_id)
    return jsonify({"confirmation": "OK"})


@app.route('/api/visits/update_visit/<visit_id>', methods=['PUT'])
@expect_mime('application/json')
@json_body
@check_token
def update_visit(visit_id):
    """
    { "patientId": patient_id,
      "date": date of the visit
    }
    """
    body = g.body

    visit_data = {
        'patientId': body['patientId'],
        'date': body.get('date', None)
    }

    visit_dao = VisitDAO()
    visit = visit_dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)
    visit_dao.update_one_by_id(visit_id, visit_data)

    return jsonify({"confirmation": "OK"})


