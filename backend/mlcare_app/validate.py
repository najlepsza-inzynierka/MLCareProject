from flask import g, request, jsonify
from functools import wraps


def mk_error(message, code=400):
    response = jsonify({"error": message})
    response.status_code = code
    return response


def if_unlocked(decorated):
    def func(self, *args, **kwargs):
        if not self.locked:
            return decorated(self, *args, **kwargs)
        return None
    return func


class Validator(object):
    def __init__(self, json_body):
        self._body = json_body
        self._response = None
        self._locked = False

    @property
    def locked(self):
        return self._locked

    def error(self):
        if self._response is None or not self._locked:
            return None
        return self._response

    @if_unlocked
    def field_present(self, key, err=None):
        if key in self._body:
            return True

        if err is None:
            msg = "Required field '%s' is not present." % key
            err = mk_error(msg, 400)

        self._response = err
        self._locked = True

        return False

    @if_unlocked
    def field_predicate(self, key, predicate, err=None):
        if key not in self._body:
            return True

        value = self._body[key]
        if predicate(value):
            return True

        if err is None:
            msg = "Field '%s' does not match predicate." % key
            err = mk_error(msg, 400)

        self._response = err
        self._locked = True

        return False


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
            g.body = json_body
        except Exception:
            return mk_error("Malformed JSON body.", code=400)
        return f(*args, **kwargs)

    return decorated
