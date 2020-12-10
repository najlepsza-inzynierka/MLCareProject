import jwt
from flask import g, request, jsonify
from functools import wraps

from database.admin_dao import AdminDAO
from database.user_dao import UserDAO
from model.auth_user import AuthUser
from model.exceptions import BlacklistedTokenException


def mk_error(message, code=400):
    response = jsonify({"message": message})
    response.status_code = code
    return response


def expect_mime(types):
    """
    Handler decorator.
    Performs check for application/json Content Type.
    """
    if not isinstance(types, list):
        types = [types]

    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            # Read 'Authorization' header
            content_type = request.headers.get("Content-Type", "")
            # This cuts off possible ';charset=...' part.
            content_type = content_type.split(";", 1)[0]
            if content_type not in types:
                return mk_error("Accepting only %s." % types, code=400)
            return f(*args, **kwargs)
        return decorated
    return decorator


def json_body(f):
    """
    Handler decorator.
    Tries to parse JSON in request body.
    If succeeded g.body will hold resulting dictionary.
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            json_body = request.get_json(silent=False)
            headers = request.headers
            g.body = json_body
            g.headers = headers
        except Exception:
            return mk_error("Malformed JSON body.", code=400)
        return f(*args, **kwargs)

    return decorated


def check_token(f):
    """
    Handler decorator.
    Performs token check
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
                g.token = auth_token
                user_id = AuthUser.decode_auth_token(auth_token)

                user_dao = UserDAO()
                user = user_dao.find_one_by_id(user_id)
                if user:
                    g.user = user
                else:
                    return mk_error('User does not exist', 404)
            except IndexError:
                return mk_error('Bearer token malformed', 401)
            except BlacklistedTokenException as e:
                return mk_error(e.args, 401)
            except jwt.ExpiredSignatureError as e:
                return mk_error(e.args, 401)
            except jwt.InvalidTokenError as e:
                return mk_error(e.args, 401)
        else:
            return mk_error('Provide a valid token', 401)
        return f(*args, **kwargs)
    return decorated


def check_admin_token(f):
    """
    Handler decorator.
    Performs admin token check
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
                g.token = auth_token
                user_id = AuthUser.decode_auth_token(auth_token)

                admin_dao = AdminDAO()
                user = admin_dao.find_one_by_id(user_id)
                if user:
                    g.admin = user
                else:
                    return mk_error('User does not exist', 404)
            except IndexError:
                return mk_error('Bearer token malformed', 401)
            except BlacklistedTokenException as e:
                return mk_error(e.args, 401)
        else:
            return mk_error('Provide a valid token', 401)
        return f(*args, **kwargs)
    return decorated
