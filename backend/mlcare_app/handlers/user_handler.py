import datetime
import os

from flask import jsonify, Blueprint, g

from .. import app
from ..database.user_dao import UserDAO
from ..model.user import User
from ..validate import expect_mime, json_body, mk_error

user_bp = Blueprint('users', __name__)


@app.route('/api/users/register', methods=['POST'])
@expect_mime('application/json')
@json_body
def add_user():
    body = g.body

    user_data = {
        'userId': body['userId'],
        'firstName': body.get('firstName', None),
        'middleName': body.get('middleName', None),
        'lastName': body.get('lastName', None),
        'title': body.get('title', None),
        'address': body.get('address', None),
        'phoneNumber': body.get('phoneNumber', None),
        'email': body.get('email', None),
        # 'institutions': TODO
        'active': True,
        'password': body.get('password', None),
        'registeredOn': datetime.datetime.now()
    }

    user = User(user_data)
    user.password = user.password
    user_dao = UserDAO()
    user_old = user_dao.find_one_by_email(user.email)
    if user_old:
        return mk_error('Email already taken', 409)
    user_dao.insert_one(user)

    return jsonify({"confirmation": "OK"})
