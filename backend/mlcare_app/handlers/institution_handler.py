import datetime

from flask import jsonify, Blueprint, g

from app_setup import app
from database.admin_dao import AdminDAO
from database.institution_dao import InstitutionDAO
from model.institution import Institution
from validate import expect_mime, json_body, mk_error

institution_bp = Blueprint('institutions', __name__)


@app.route('/api/institutions', methods=['POST'])
@expect_mime('application/json')
@json_body
def add_institution():
    body = g.body

    institution_data = {
        'institutionName': body.get('institutionName', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'admins': [],
        'users': [],
        'usersLimit': int(body.get('usersLimit', None)),
        'usersNo': 0,
        'registeredOn': datetime.datetime.now()
    }

    institution = Institution(institution_data)
    institution_dao = InstitutionDAO()
    institution_old = institution_dao.find_one_by_email(institution.email)
    if institution_old:
        return mk_error('Email already taken', 409)
    inst_id = institution_dao.insert_one(institution)

    return jsonify({"confirmation": "OK",
                    "newInst": inst_id})


@app.route('/api/institutions', methods=['GET'])
@json_body
def get_institutions():
    institution_dao = InstitutionDAO()
    institutions = institution_dao.find_all_institutions()
    resp = [inst.data for inst in institutions]
    return jsonify(resp)


@app.route('/api/institutions/<institution_id>', methods=['DELETE'])
@json_body
def delete_institution(institution_id):
    institution_dao = InstitutionDAO()
    admin_dao = AdminDAO()
    institution = institution_dao.find_one_by_id(institution_id)
    if not institution:
        return mk_error('Institution with given id not found')
    else:
        if len(institution.users):
            return mk_error('Cannot delete institution when there are users '
                            'that belong to it', 400)
        for admin_id in institution.admins:
            admin_dao.delete_one_by_id(admin_id)
        institution_dao.delete_one_by_id(institution_id)
    return jsonify(f'Institution {institution_id} deleted')
