import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from app_setup import app, bcrypt
from database.admin_dao import AdminDAO
from database.institution_dao import InstitutionDAO
from database.token_dao import TokenDAO
from database.user_dao import UserDAO
from model.admin import Admin
from model.blacklisted_token import BlacklistedToken
from validate import expect_mime, json_body, mk_error, check_admin_token

admin_bp = Blueprint('admins', __name__)


@app.route('/api/institutions/<institution_id>/admin', methods=['POST'])
@expect_mime('application/json')
@json_body
def register_admin(institution_id):
    body = g.body

    admin_data = {
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'institutionId': institution_id,
        'active': True,
        'password': body.get('password', None),
        'registeredOn': datetime.datetime.now()
    }

    admin = Admin(admin_data)
    admin.password = admin.password
    admin_dao = AdminDAO()
    admin_old = admin_dao.find_one_by_email(admin.email)
    if admin_old:
        return mk_error('Email already taken', 409)
    admin_id = admin_dao.insert_one(admin)

    # add user to institution
    institution_dao = InstitutionDAO()
    institution = institution_dao.find_one_by_id(institution_id)
    institution.admins.append(admin_id)
    institution_dao.update_one_by_id(institution_id, institution)

    return jsonify({"confirmation": "OK",
                    "new_id": admin_id})


@app.route('/api/admins/login', methods=['POST'])
@expect_mime('application/json')
@json_body
def login_admin():
    body = g.body
    admin_data = {
        'email': body['email'],
        'password': body['password']
    }

    admin_dao = AdminDAO()

    try:
        admin = admin_dao.find_one_by_email(admin_data['email'])
        if admin and bcrypt.check_password_hash(
                admin.password, admin_data['password']):
            auth_token = admin.encode_auth_token().decode()
            admin.prepare_to_send()
            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token,
                    'admin': admin.data
                }
                return jsonify(response_object), 200
        else:
            return mk_error('Email or password incorrect', 401)
    except Exception:
        return mk_error('Something went wrong, try again', 500)


@app.route('/api/admins/logout', methods=['POST'])
@check_admin_token
def logout_admin():
    blacklist_token = BlacklistedToken({})
    blacklist_token.token = g.token
    blacklist_token.blacklisted_on = datetime.datetime.now()
    try:
        token_dao = TokenDAO()
        token_dao.insert_one(blacklist_token)
        response = {
            'status': 'success',
            'message': 'Successfully logged out from administration panel.'
        }
        return jsonify(response)
    except Exception:
        return mk_error('failed: try again', 200)


@app.route('/api/admins/institution', methods=['GET'])
@check_admin_token
def get_institution():
    admin = g.admin
    institution_id = admin.institution_id

    institution_dao = InstitutionDAO()
    user_dao = UserDAO()

    institution = institution_dao.find_one_by_id(institution_id)
    if institution:
        institution.users = user_dao.find_users_of_institution(institution.users)
    else:
        mk_error('Institution not in database', 404)

    return jsonify({'confirmation': 'OK',
                    'institution': institution.data})


@app.route('/api/admins/admin', methods=['GET'])
@check_admin_token
def get_admin():
    admin = g.admin
    admin.prepare_to_send()

    return jsonify({'confirmation': 'OK',
                    'admin': admin.data})


@app.route('/api/admins/user/<user_id>', methods=['GET'])
@check_admin_token
def get_user_as_admin(user_id):
    admin = g.admin

    user_dao = UserDAO()
    user = user_dao.find_one_by_id(user_id)

    if admin.institution_id not in user.institutions:
        mk_error('This user does not belong to your institution', 409)

    user.prepare_to_send()
    return jsonify({'confirmation': 'OK',
                    'user': user.data})


@app.route('/api/admins/<admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    admin_dao = AdminDAO()
    admin = admin_dao.find_one_by_id(admin_id)
    if not admin:
        return mk_error('There is no admin with given id', 404)

    institution_id = admin.institution_id
    institution_dao = InstitutionDAO()
    institution = institution_dao.find_one_by_id(institution_id)
    if institution:
        if len(institution.admins) != 1:
            admin_dao.delete_one_by_id(admin_id)
            institution.admins.remove(ObjectId(admin_id))
            institution_dao.update_one_by_id(institution_id, institution)
            return jsonify(f'Admin {admin_id} deleted')
        else:
            return mk_error('There is only one admin in given admin\'s '
                            'institution. You cannot delete the only admin of '
                            'institution', 400)
    else:
        return mk_error('This admin has no institution')


@app.route('/api/admins/change_passwd', methods=['PUT'])
@expect_mime('application/json')
@json_body
@check_admin_token
def update_password_admin_self():
    body = g.body
    admin = g.admin

    admin.password = body.get('password')

    admin_dao = AdminDAO()
    admin_dao.update_one_by_id(admin.id, admin.data)

    return jsonify({'confirmation': 'OK'})


@app.route('/api/admins/update', methods=['PUT'])
@expect_mime('application/json')
@json_body
@check_admin_token
def update_admin_by_admin():
    body = g.body
    admin = g.admin

    admin_dao = AdminDAO()

    # only following data could be changed
    admin.first_name = body.get('firstName', admin.first_name)
    admin.middle_name = body.get('middleName', admin.middle_name)
    admin.last_name = body.get('lastName', admin.last_name)
    admin.phone_no = body.get('phoneNumber', admin.phone_no)
    admin.address = body.get('address', admin.address)

    admin_dao.update_one_by_id(admin.id, admin)

    return jsonify({'confirmation': 'OK'})

