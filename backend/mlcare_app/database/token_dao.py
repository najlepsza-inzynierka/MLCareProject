from bson import ObjectId

from database import db
from model.blacklisted_token import BlacklistedToken


class TokenDAO:
    def __init__(self):
        self.coll = db['tokens']

    # Create
    def insert_one(self, token):
        return self.coll.insert_one(token.data).inserted_id

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        if data:
            return BlacklistedToken(data)
        else:
            return None

    def find_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        return self.find_one(query)

    def find_one_by_token(self, token):
        query = {"token": token}
        return self.find_one(query)

    def find_one_by_object(self, token):
        query = {"_id": token.id}
        return self.find_one(query)

    def find_one_by_token_id(self, token_id):
        query = {"tokenId": token_id}
        return self.find_one(query)

    def find(self, query):
        all_data = self.coll.find(query)
        return [BlacklistedToken(data)
                for data
                in all_data]

    def find_all_tokens(self):
        query = {}
        return self.find(query)

    # Update
    def update_one_by_id(self, _id, new_token):
        new_token.id = ObjectId(_id)
        query = {"_id": ObjectId(_id)}
        self.coll.replace_one(query, new_token.data)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {"_id": ObjectId(_id)}
        self.coll.delete_one(query)

