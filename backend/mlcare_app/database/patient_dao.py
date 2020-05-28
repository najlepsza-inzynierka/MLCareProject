from bson import ObjectId

from . import db
from ..model.patient import Patient


class PatientDAO:
    def __init__(self):
        self.coll = db['patients']

    # Create
    def insert_one(self, patient):
        self.coll.insert_one(patient.data)

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return Patient(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        return self.find_one(query)

    def find_one_by_object(self, patient):
        query = {"_id": patient.id}
        return self.find_one(query)

    def find_one_by_patient_id(self, patient_id):
        query = {"patientId": patient_id}
        return self.find_one(query)

    def find(self, query):
        all_data = self.coll.find(query)
        return [Patient(data)
                for data
                in all_data]

    def find_all_patients(self):
        query = {}
        return self.find(query)

    # Update
    def update_one(self, query, update):
        self.coll.update_one(query, update)

    def update_one_by_id(self, _id, update):
        query = {"_id": _id}
        self.coll.update_one(query, update)

    def update_one_by_patient_id(self, patient_id, update):
        query = {"patientId": patient_id}
        self.coll.update_one(query, update)

    def add_visit(self, patient_id, visit):
        if not visit:
            raise ValueError('Visit cannot be an empty value')

        query = {'_id': patient_id}

        update = {
            "$push": {'visits': visit}
        }
        self.coll.find_one_and_update(query, update)

    def update_visit(self, patient_id, old_id, new_visit_data):
        if not new_visit_data:
            raise ValueError('Visit cannot be an empty value')

        query = {'_id': patient_id}
        update = {
            '$pull': {'visits': {'id': old_id}},
            '$push': {'visits': new_visit_data}
        }
        self.coll.find_one_and_update(query, update)

    def delete_visit(self, patient_id, visit_id):
        if not visit_id:
            raise ValueError('Visit cannot be an empty value')

        query = {'_id': patient_id}
        update = {
            '$pull': {'visits': {'id': visit_id}}
        }
        self.coll.find_one_and_update(query, update)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {"_id": _id}
        self.coll.delete_one(query)

