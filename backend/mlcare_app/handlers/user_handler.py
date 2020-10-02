import datetime
import os

from flask import jsonify, Blueprint, g

from .. import app, bcrypt
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
        'institutions': [admin_user.institution_id],
        'active': True,
        'password': body.get('password', None),
        'registeredOn': datetime.datetime.now(),
        'registeredBy': g.admin.id
    }

    user = User(user_data)
    user.password = user.password
    user_dao = UserDAO()
    user_old = user_dao.find_one_by_email(user.email)
    if user_old:
        return mk_error('Email already taken', 409)
    user_id = user_dao.insert_one(user)
    auth_token = user.encode_auth_token().decode()

    return jsonify({"confirmation": "OK", "new_id": user_id})


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
            auth_token = user.encode_auth_token()
            if auth_token:
                response_object = {
                    'status': 'success',
                    'message': 'Successfully logged in.',
                    'auth_token': auth_token.decode()
                }
                return jsonify(response_object), 200

        else:
            return mk_error('Email or password incorrect', 404)
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
