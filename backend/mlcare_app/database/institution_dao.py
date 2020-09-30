from bson import ObjectId

from . import db
from ..model.institution import Institution


class InstitutionDAO:
    def __init__(self):
        self.coll = db['institutions']

    # Create
    def insert_one(self, institution):
        self.coll.insert_one(institution.data)

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return Institution(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        return self.find_one(query)

    def find_one_by_email(self, email):
        query = {"email": email}
        return self.find_one(query)

    def find_one_by_object(self, institution):
        query = {"_id": institution.id}
        return self.find_one(query)

    def find_one_by_institution_id(self, institution_id):
        query = {"institutionId": institution_id}
        return self.find_one(query)

    def find(self, query):
        all_data = self.coll.find(query)
        return [Institution(data)
                for data
                in all_data]

    def find_all_institutions(self):
        query = {}
        return self.find(query)

    # Update
    def update_one_by_id(self, _id, new_institution):
        new_institution.id = ObjectId(_id)
        query = {"_id": ObjectId(_id)}
        self.coll.replace_one(query, new_institution.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        self.coll.delete_one(query)

