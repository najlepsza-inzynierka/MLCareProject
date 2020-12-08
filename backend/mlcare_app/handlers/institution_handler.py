import datetime

from flask import jsonify, Blueprint, g

from .. import app
from ..database.institution_dao import InstitutionDAO
from ..model.institution import Institution
from ..validate import expect_mime, json_body, mk_error, check_token

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