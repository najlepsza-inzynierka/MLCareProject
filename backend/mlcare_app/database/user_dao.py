from bson import ObjectId

from . import db
from ..model.user import User


class UserDAO:
    def __init__(self):
        self.coll = db['users']

    # Create
    def insert_one(self, user):
        return self.coll.insert_one(user.data).inserted_id

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return User(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        return self.find_one(query)

    def find_one_by_email(self, email):
        query = {"email": email}
        return self.find_one(query)

    def find_one_by_object(self, user):
        query = {"_id": user.id}
        return self.find_one(query)

    def find_one_by_user_id(self, user_id):
        query = {"userId": user_id}
        return self.find_one(query)

    def find(self, query):
        all_data = self.coll.find(query)
        return [User(data)
                for data
                in all_data]

    def find_all_users(self):
        query = {}
        return self.find(query)

    # Update
    def update_one_by_id(self, _id, new_user):
        new_user.id = ObjectId(_id)
        query = {"_id": ObjectId(_id)}
        self.coll.replace_one(query, new_user.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        self.coll.delete_one(query)

