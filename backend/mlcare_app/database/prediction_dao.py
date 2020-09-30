from bson import ObjectId

from . import db
from ..model.prediction import Prediction


class PredictionDAO:
    def __init__(self):
        self.coll = db['predictions']

    # Create
    def insert_one(self, prediction):
        return self.coll.insert_one(prediction.data).inserted_id

    # Update
    def update_one_by_id(self, old_id, new_prediction_data):
        new_prediction = Prediction(new_prediction_data)
        new_prediction.id = ObjectId(old_id)
        query = {"_id": ObjectId(old_id)}
        self.coll.replace_one(query, new_prediction.data)

    # Read
    def find(self, query):
        all_data = self.coll.find(query)
        predictions = [Prediction(data) for data in all_data]
        return predictions

    def find_all_predictions_by_visit_id(self, visit_id):
        query = {'visitId': ObjectId(visit_id)}
        return self.find(query)

    def find_one(self, query):
        data = self.coll.find_one(query)
        return Prediction(data) if data else None

    def find_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        return self.find_one(query)

    # Delete
    def delete_one(self, query):
        self.coll.delete_one(query)

    def delete_one_by_id(self, _id):
        query = {'_id': ObjectId(_id)}
        self.coll.delete_one(query)

    def delete_all_by_visit_id(self, visit_id):
        query = {'visitId': ObjectId(visit_id)}
        self.coll.delete_many(query)
