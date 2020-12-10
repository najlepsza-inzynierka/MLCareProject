from bson import ObjectId

from database import db
from model.admin import Admin


class AdminDAO:
    def __init__(self):
        self.coll = db['admins']

    # Create
    def insert_one(self, admin):
        return self.coll.insert_one(admin.data).inserted_id

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return Admin(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        return self.find_one(query)

    def find_one_by_email(self, email):
        query = {"email": email}
        return self.find_one(query)

    def find_one_by_object(self, admin):
        query = {"_id": admin.id}
        return self.find_one(query)

    def find_one_by_admin_id(self, admin_id):
        query = {"adminId": admin_id}
        return self.find_one(query)

    def find(self, query):
        all_data = self.coll.find(query)
        return [Admin(data)
                for data
                in all_data]

    def find_all_admins(self):
        query = {}
        return self.find(query)

    # Update
    def update_one_by_id(self, _id, new_admin):
        new_admin.id = ObjectId(_id)
        query = {"_id": ObjectId(_id)}
        self.coll.replace_one(query, new_admin.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        self.coll.delete_one(query)

