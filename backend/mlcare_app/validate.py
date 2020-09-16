from flask import g, request, jsonify
from functools import wraps


def mk_error(message, code=400):
    response = jsonify({"message": message})
    response.status_code = code
    return response


def if_unlocked(decorated):
    def func(self, *args, **kwargs):
        if not self.locked:
            return decorated(self, *args, **kwargs)
        return None
    return func


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
