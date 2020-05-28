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
        self.coll.insert_one(visit.data)

    # Update
    def update_one_by_id(self, old_id, new_visit):
        new_visit = Visit(new_visit)
        new_visit.id = old_id
        query = {"_id": old_id}
        self.coll.replace_one(old_id, new_visit.data)

    # Delete
    def delete_one(self, patient_id, visit_id):
        self.patient_dao.delete_visit(patient_id, visit_id)

