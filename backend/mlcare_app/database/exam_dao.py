from bson import ObjectId

from . import db
from model.exam import Exam


class ExamDAO:
    def __init__(self):
        self.coll = db['exams']

    # Create
    def insert_one(self, exam):
        self.coll.insert_one(exam.data)

    def insert_many(self, exams):
        self.coll.insert_many([exam.data for exam in exams])

    # Read
    def find(self, query):
        all_data = self.coll.find(query)
        return [Exam(data) for data in all_data]

    def find_all_exams_by_visit_id(self, visit_id):
        query = {'visitId': ObjectId(visit_id)}
        return self.find(query)

    def find_one(self, query):
        data = self.coll.find_one(query)
        return Exam(data) if data else None

    def find_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        return self.find_one(query)

    # Update
    def update_one_by_id(self, old_id, new_exam):
        new_exam.id = ObjectId(old_id)
        query = {"_id": ObjectId(old_id)}
        self.coll.replace_one(query, new_exam.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        self.coll.delete_one(query)

    def delete_all_by_visit_id(self, visit_id):
        query = {'visitId': ObjectId(visit_id)}
        self.coll.delete_many(query)
