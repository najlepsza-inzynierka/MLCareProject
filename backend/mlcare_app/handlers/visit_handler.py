import os

from flask import jsonify, Blueprint, g

from .. import app
from ..database.visit_dao import VisitDAO
from ..model.visit import Visit
from ..validate import expect_mime, json_body, Validator, mk_error

visit_bp = Blueprint('visits', __name__)


# everywhere patient.id not patient.patientId
@app.route('/api/patients/<patient_id>/add_visit', methods=['POST'])
@expect_mime('application/json')
@json_body
def add_visit(patient_id):
    body = g.body

    visit_data = {
        'patientId': body['patientId'],
        'doctorId': body['doctorId'],
        'doctorName': body.get('doctorName', None),
        'date': body.get('date', None),
        'lastName': body.get('lastName', None),
        'exams': body.get('exams', []),
        'predictions': body.get('predictions', []),
    }

    visit = Visit(visit_data)
    visit_dao = VisitDAO()
    visit_dao.insert_one(visit)

    return jsonify({"confirmation": "OK"})


@app.route('/api/patients/<patient_id>/delete_visit/<visit_id>')
def delete_visit(patient_id, visit_id):
    visit_dao = VisitDAO()
    visit_dao.delete_one(patient_id, visit_id)
    return jsonify({"confirmation": "OK"})


@app.route('/api/patients/<patient_id>/update_visit/<visit_id>', methods=[
    'POST'])
@expect_mime('application/json')
@json_body
def update_visit(patient_id, visit_id):
    body = g.body

    visit_data = {
        'doctorId': body['doctorId'],
        'doctorName': body.get('doctorName', None),
        'date': body.get('date', None),
        'lastName': body.get('lastName', None),
        'exams': body.get('exams', []),
        'predictions': body.get('predictions', []),
    }

    visit_dao = VisitDAO()
    visit_dao.update_one_by_patient_id(patient_id, visit_id, visit_data)

    return jsonify({"confirmation": "OK"})


