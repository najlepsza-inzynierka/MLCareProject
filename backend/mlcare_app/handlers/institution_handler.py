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
@check_token
def add_institution():
    body = g.body

    institution_data = {
        'institutionName': body.get('institutionName', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'admins': [],
        'usersLimit': body.get('usersLimit', None),
        'usersNo': 0,
        'registeredOn': datetime.datetime.now()
    }

    institution = Institution(institution_data)
    institution_dao = InstitutionDAO()
    institution_old = institution_dao.find_one_by_email(institution.email)
    if institution_old:
        return mk_error('Email already taken', 409)
    institution_dao.insert_one(institution)

    return jsonify({"confirmation": "OK"})

