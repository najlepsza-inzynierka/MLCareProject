import os
from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.exam_dao import ExamDAO
from ..database.patient_dao import PatientDAO
from ..database.visit_dao import VisitDAO
from ..model.exam import Exam
from ..model.visit import Visit
from ..validate import expect_mime, json_body, Validator, mk_error

visit_bp = Blueprint('visits', __name__)


# everywhere patient.id not patient.patientId
@app.route("/api/visits/<patient_id>", methods=["GET"])
def get_all_visits_by_patient_id(patient_id):
    dao = PatientDAO()
    patient = dao.find_one_by_id(patient_id)
    if not patient:
        return mk_error('Patient not in database', 404)

    dao = VisitDAO()
    visits = dao.find_all_visits_by_patient_id(patient_id)
    result = []
    for visit in visits:
        result.append(visit.data)
    return jsonify(result)


@app.route("/api/visit/<visit_id>", methods=["GET"])
def get_visit(visit_id):
    dao = VisitDAO()
    visit = dao.find_one_by_id(visit_id)
    if not visit:
        return mk_error('Visit not in database', 404)
    examDAO = ExamDAO()
    exams = examDAO.find_all_exams_by_visit_id(visit_id)
    exams_data = [exam.data for exam in exams]
    visit.exams = exams_data
    return jsonify(visit.data)


@app.route("/api/patient/<patient_id>/add_visit", methods=["POST"])
@expect_mime('application/json')
@json_body
def add_visit(patient_id):
    body = g.body

    visit_data = {
        'patientId': ObjectId(patient_id),
        'doctorId': ObjectId(body.get('doctorId', '')),
        'doctorName': body.get('doctorName', None),
        'date': datetime.utcnow()
    }

    visit = Visit(visit_data)
    visit_dao = VisitDAO()
    visit_id = visit_dao.insert_one(visit)

    exams = body.get('exams', None)
    if exams:
        exam_dao = ExamDAO()
        for exam in exams:
            exam_db = Exam(exam)
            exam_db.visit_id = visit_id
            exam_dao.insert_one(exam_db)

    return jsonify({"confirmation": "OK",
                    "new_id": visit_id})


@app.route('/api/visits/delete_visit/<visit_id>', methods=['DELETE'])
def delete_visit(visit_id):
    visit_dao = VisitDAO()
    visit_dao.delete_one(visit_id)
    return jsonify({"confirmation": "OK"})


@app.route('/api/visits/update_visit/<visit_id>', methods=['PUT'])
@expect_mime('application/json')
@json_body
def update_visit(visit_id):
    body = g.body

    visit_data = {
        'patientId': ObjectId(body['patientId']),
        'doctorId': ObjectId(body['doctorId']),
        'doctorName': body.get('doctorName', None),
        'date': body.get('date', None)
    }

    visit_dao = VisitDAO()
    visit_dao.update_one_by_id(visit_id, visit_data)

    return jsonify({"confirmation": "OK"})


