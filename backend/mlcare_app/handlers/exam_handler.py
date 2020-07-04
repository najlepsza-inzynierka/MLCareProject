from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.exam_dao import ExamDAO
from ..database.patient_dao import PatientDAO
from ..database.visit_dao import VisitDAO
from ..model.exam import Exam
from ..model.visit import Visit
from ..validate import expect_mime, json_body, Validator, mk_error

exam_bp = Blueprint('exams', __name__)

#todo -> caly exam handler zrobilam
@app.route('/api/exams/delete_exam/<exam_id>', methods=['DELETE'])
def delete_exam(exam_id):
    exam_dao = ExamDAO()
    exam_dao.delete_one_by_id(exam_id)
    return jsonify({"confirmation": "OK"})
