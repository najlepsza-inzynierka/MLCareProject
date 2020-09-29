import os

from flask import jsonify, Blueprint, g

from .. import app
from ..database.patient_dao import PatientDAO
from ..model.patient import Patient
from ..validate import expect_mime, json_body, Validator, mk_error

patient_bp = Blueprint('patients', __name__)


# everywhere patient.id not patient.patientId
@app.route("/api/patients", methods=["GET"])
def get_all_patients():
    dao = PatientDAO()
    patients = dao.find_all_patients()
    result = []
    for patient in patients:
        result.append(patient.data)
    return jsonify(result)


@app.route("/api/patient/<patient_id>", methods=["GET"])
def get_patient(patient_id):
    dao = PatientDAO()
    patient = dao.find_one_by_id(patient_id)
    if not patient:
        return mk_error('Patient not in database', 404)
    return jsonify(patient.data)


@app.route('/api/patients', methods=['POST'])
@expect_mime('application/json')
@json_body
def add_patient():
    body = g.body

    patient_data = {
        'patientId': body['patientId'],
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'gender': body.get('gender', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'birthDate': body.get('birthDate', None),
        'birthPlace': body.get('birthPlace', None)
    }

    patient = Patient(patient_data)
    patient_dao = PatientDAO()
    patient_old = patient_dao.find_one_by_patient_id(patient.patient_id)
    if patient_old:
        return mk_error('Patient with given id already found in database', 409)
    patient_dao.insert_one(patient)

    return jsonify({"confirmation": "OK"})


@app.route('/api/patients/update/<patient_id>', methods=['PUT'])
@expect_mime('application/json')
@json_body
def update_patient(patient_id):
    body = g.body

    patient_data = {
        'patientId': body['patientId'],
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'gender': body.get('gender', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'birthDate': body.get('birthDate', None),
        'birthPlace': body.get('birthPlace', None)
    }

    patient_dao = PatientDAO()
    patient_old = patient_dao.find_one_by_id(patient_id)
    if not patient_old:
        return mk_error('Patient not in database', 404)
    patient_new = Patient(patient_data)
    patient_dao.update_one_by_id(patient_id, patient_new)

    return jsonify({"confirmation": "OK"})


@app.route("/api/patients/delete_patient/<patient_id>", methods=["DELETE"])
def delete_patient(patient_id):
    dao = PatientDAO()
    dao.delete_one_by_id(patient_id)
    return jsonify({"confirmation": "OK"})
