import datetime

from flask import jsonify, Blueprint, g

from .. import app, bcrypt
from ..database.institution_dao import InstitutionDAO
from ..database.token_dao import TokenDAO
from ..database.user_dao import UserDAO
from ..model.blacklisted_token import BlacklistedToken
from ..model.user import User
from ..validate import (
    expect_mime, json_body, mk_error, check_admin_token, check_token)

user_bp = Blueprint('users', __name__)


@app.route('/api/users/register', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_admin_token
def add_user():
    body = g.body
    admin_user = g.admin

    user_data = {
        'userId': body['userId'],
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'title': body.get('title', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        'emails': [body.get('email', None)],
        'institutions': [admin_user.institution_id],
        'active': True,
        'password': body.get('password', None),
        'registeredOn': datetime.datetime.now(),
        'registeredBy': g.admin.id
    }

    institution_dao = InstitutionDAO()
    institution = institution_dao.find_one_by_id(admin_user.institution_id)
    if institution.user_no >= institution.user_limit:
        mk_error('Institution achieved maximum medical staff number', 407)

    user = User(user_data)

    # encrypting password hash
    user.password = user.password
    user_dao = UserDAO()
    user_by_user_id = user_dao.find_one_by_user_id(user.user_id)
    if user_by_user_id:
        if admin_user.institution_id in user_by_user_id.institutions:
            return mk_error('There already is staff with given userId '
                            'assigned to your institution', 409)
        else:
            institutions_list = institution_dao.find_all_from_list_by_id(
                user_by_user_id.institutions)
            return mk_error('There already is staff with given user id '
                            'identifying themselves with email'
                            f'{user_by_user_id.email} in the '
                            'system assigned to following institutions: '
                            f'{institutions_list}. You can add them also to '
                            f'your institution with force request but this '
                            f'will not change user\'s login credentials', 450)

    user_old = user_dao.find_one_by_email(user.email)
    if user_old:
        return mk_error('Email already taken', 406)
    user_id = user_dao.insert_one(user)

    # add user to institution
    institution.add_user(user_id)
    institution_dao.update_one_by_id(institution.id, institution)

    return jsonify({"confirmation": "OK", "new_id": user_id})


@app.route('/api/users/register/force', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_admin_token
def add_user_force():
    body = g.body
    admin_user = g.admin

    user_data = {
        'userId': body['userId'],
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'email': body.get('email', None),
        'title': body.get('title', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'password': body.get('password', None),
        'active': True,
        'registeredOn': datetime.datetime.now(),
        'registeredBy': g.admin.id
    }

    user = User(user_data)

    # encrypting password hash
    user.password = user.password
    user_dao = UserDAO()
    user_by_user_id = user_dao.find_one_by_user_id(user.user_id)
    if user_by_user_id:
        if admin_user.institution_id in user_by_user_id.institutions:
            return mk_error('There already is doctor with given userId '
                            'assigned to your institution', 409)
    else:
        mk_error('User not in database', 404)
    user_by_user_id.institutions.append(admin_user.institution_id)
    new_email = user_data.get('email', None)
    if new_email:
        if new_email not in user_by_user_id.emails:
            user_by_user_id.emails.append(new_email)

    user_id = user_dao.update_one_by_id(user_by_user_id.id, user_by_user_id)

    # add user to institution
    institution_dao = InstitutionDAO()
    institution = institution_dao.find_one_by_id(admin_user.institution_id)
    institution.add_user(user_id)
    institution_dao.update_one_by_id(institution.id, institution)

    return jsonify({"confirmation": "OK", "user_id": user_id})


@app.route('/api/users/login', methods=['POST'])
@expect_mime('application/json')
@json_body
def login_user():
    body = g.body
    user_data = {
        'email': body['email'],
        'password': body['password']
    }

    user_dao = UserDAO()

    try:
        user = user_dao.find_one_by_email(user_data['email'])
        if user and bcrypt.check_password_hash(
                user.password, user_data['password']):
            auth_token = user.encode_auth_token().decode()
            user.prepare_to_send()
            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token,
                    'user': user.data
                }
                return jsonify(response_object), 200
        else:
            return mk_error('Email or password incorrect', 401)
    except Exception:
        return mk_error('Something went wrong, try again', 500)


@app.route('/api/users/logout', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_token
def logout_user():
    blacklist_token = BlacklistedToken({})
    blacklist_token.token = g.token
    blacklist_token.blacklisted_on = datetime.datetime.now()
    try:
        token_dao = TokenDAO()
        token_dao.insert_one(blacklist_token)
        response = {
            'status': 'success',
            'message': 'Successfully logged out.'
        }
        return jsonify(response)
    except Exception:
        return mk_error('failed: try again', 200)


@app.route('/api/users/user', methods=['GET'])
@check_token
def get_user():
    user = g.user
    user.prepare_to_send()

    return jsonify({'confirmation': 'OK',
                    'user': user.data})


