from bson import ObjectId

from . import db
from .visit_dao import VisitDAO
from model.patient import Patient


class PatientDAO:
    def __init__(self):
        self.coll = db['patients']
        self.visit_dao = VisitDAO()

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

    def find_patient_by_visit_id(self, visit_id):
        visit = self.visit_dao.find_one_by_id(visit_id)
        patient_id = visit.patient_id
        return self.find_one_by_id(patient_id)

    # Update
    def update_one_by_id(self, _id, new_patient):
        new_patient.id = ObjectId(_id)
        query = {"_id": ObjectId(_id)}
        self.coll.replace_one(query, new_patient.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        visits = [visit.id for
                  visit in self.visit_dao.find_all_visits_by_patient_id(
                    _id)]
        for visit_id in visits:
            self.visit_dao.delete_one_by_id(visit_id)
        query = {"_id": ObjectId(_id)}
        self.coll.delete_one(query)

