from datetime import date, datetime

from bson import ObjectId
from flask import Flask
from flask.json import JSONEncoder, JSONDecoder
from flask_cors import CORS
from flask_bcrypt import Bcrypt


class MongoJSONEncoder(JSONEncoder):
    def default(self, o):
        # uses ISO format: YYYY-MM-DD, e. g. "2002-12-04"
        if isinstance(o, date):
            return str(date)

        # uses modified ISO format: YYYY-MM-DD HH-MM-SS
        # e. g. "2002-12-04 12:00:01"
        if isinstance(o, datetime):
            return o.strftime("%Y-%m-%d %H-%M-%S")

        if isinstance(o, ObjectId):
            return str(o)
        else:
            return super().default(o)


class MongoJSONDecoder(JSONDecoder):
    # uses the same formats as encoder
    def default(self, o):
        pass


app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
app.json_encoder = MongoJSONEncoder


# Blueprints import
from .handlers.patient_handler import patient_bp
from .handlers.visit_handler import visit_bp
from .handlers.prediction_handler import prediction_bp
from .handlers.diseases_handler import diseases_bp
from .handlers.exam_handler import exam_bp
from .handlers.user_handler import user_bp

# Blueprints registration
app.register_blueprint(patient_bp)
app.register_blueprint(visit_bp)
app.register_blueprint(prediction_bp)
app.register_blueprint(diseases_bp)
app.register_blueprint(exam_bp)
app.register_blueprint(user_bp)