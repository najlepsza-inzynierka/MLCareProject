from bson import ObjectId
from flask import jsonify, Blueprint, g

from .. import app
from ..database.exam_dao import ExamDAO
from ..model.exam import Exam
from ..validate import expect_mime, json_body, mk_error, check_token

exam_bp = Blueprint('exams', __name__)


@app.route('/api/visit/<visit_id>/add_exam', methods=['POST'])
@expect_mime('application/json')
@json_body
@check_token
def add_exam(visit_id):
    """
    { "name": exam_name,
      "date": exam_date,
      "features": list[Features]
    }
    """
    body = g.body

    exam_data = {
        'name': body.get('name', None),
        'visitId': visit_id,
        'date': body.get('date', None),
        'features': body.get('features', None)
    }

    exam = Exam(exam_data)
    exam_dao = ExamDAO()
    exam_id = exam_dao.insert_one(exam)

    return jsonify({'confirmation': 'OK', 'new_id': ObjectId(exam_id)})


@app.route('/api/exams/edit_exam/<exam_id>', methods=['PUT'])
@check_token
def update_exam(exam_id):
    """
        { "name": exam_name,
          "date": exam_date,
          "features": list[Features]
        }
     """
    body = g.body

    exam_data = {'name': body.get['name', None],
                 'date': body.get['date', None],
                 'features': body.get['features', None]}

    exam_dao = ExamDAO()
    old_exam = exam_dao.find_one_by_id(exam_id)
    if not old_exam:
        return mk_error('Exam not in database', 404)

    new_exam = Exam(exam_data)
    new_exam.visit_id = old_exam.visit_id
    exam_id = exam_dao.update_one_by_id(exam_id, new_exam)

    return jsonify({'confirmation': 'OK', 'new_id': ObjectId(exam_id)})


@app.route('/api/exams/delete_exam/<exam_id>', methods=['DELETE'])
@check_token
def delete_exam(exam_id):
    exam_dao = ExamDAO()
    exam_dao.delete_one_by_id(exam_id)
    return jsonify({'confirmation': 'OK'})
