from . import db
from ..model.patient import Patient
from ..model.visit import Visit
from .patient_dao import PatientDAO


class VisitDAO:
    def __init__(self):
        self.coll = db['patients']
        self.patient_dao = PatientDAO()

    # Create
    def insert_one(self, patient_id, visit):
        self.patient_dao.add_visit(patient_id, visit)

    # Update
    def update_one_by_patient_id(self, patient_id, old_id, new_visit):
        new_visit = Visit(new_visit)
        new_visit.id = old_id
        self.patient_dao.update_visit(patient_id, old_id, new_visit.data)

    # Delete
    def delete_one(self, patient_id, visit_id):
        self.patient_dao.delete_visit(patient_id, visit_id)

