from bson import ObjectId

from . import db
from ..model.patient import Patient
from ..model.visit import Visit
from .patient_dao import PatientDAO


class VisitDAO:
    def __init__(self):
        self.coll = db['visits']

    # Create
    def insert_one(self, visit):
        return self.coll.insert_one(visit.data).inserted_id

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
        self.coll.delete_one(query)

    # Read
    def find(self, query):
        all_data = self.coll.find(query)
        return [Visit(data)
                for data
                in all_data]

    def find_all_visits_by_patient_id(self, patient_id):
        query = {'patientId': ObjectId(patient_id)}
        return self.find(query)

    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return Visit(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        return self.find_one(query)

