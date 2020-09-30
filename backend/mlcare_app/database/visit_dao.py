from bson import ObjectId

from . import db
from .exam_dao import ExamDAO
from .prediction_dao import PredictionDAO
from ..model.visit import Visit


class VisitDAO:
    def __init__(self):
        self.coll = db['visits']
        self.exam_dao = ExamDAO()
        self.prediction_dao = PredictionDAO()

    # Create
    def insert_one(self, visit):
        return self.coll.insert_one(visit.data).inserted_id

    # Read
    def find(self, query):
        all_data = self.coll.find(query)
        visits = [Visit(data) for data in all_data]
        return visits

    def find_all_visits_by_patient_id(self, patient_id):
        query = {'patientId': ObjectId(patient_id)}
        return self.find(query)

    def find_one(self, query):
        data = self.coll.find_one(query)
        return Visit(data) if data else None

    def find_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        return self.find_one(query)

    # Update
    def update_one_by_id(self, old_id, new_visit_data):
        new_visit = Visit(new_visit_data)
        new_visit.id = ObjectId(old_id)
        query = {"_id": ObjectId(old_id)}
        self.coll.replace_one(query, new_visit.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        self.exam_dao.delete_all_by_visit_id(_id)
        self.prediction_dao.delete_all_by_visit_id(_id)
        self.coll.delete_one(query)