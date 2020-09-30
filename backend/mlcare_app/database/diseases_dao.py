import datetime

from bson import ObjectId

from . import db
from ..model.disease_db import DiseaseDB


class DiseaseDAO:
    def __init__(self):
        self.coll = db['diseases']

    # Create
    def add_disease_db(self):
        old_latest = self.find_one_by_tag('latest')
        if old_latest:
            old_latest.tag = old_latest.date + '_end'
            query = {"_id": ObjectId(old_latest.id)}
            self.coll.replace_one(query, old_latest.data)
        new_latest = DiseaseDB({})
        new_latest.date = datetime.datetime.now()
        new_latest.tag = 'latest'
        new_latest.diseases = []
        self.coll.insert_one(new_latest.data)

    # Read
    def find_one(self, query):
        data = self.coll.find_one(query)
        return DiseaseDB(data) if data else None

    def find_one_by_tag(self, tag):
        query = {"tag": tag}
        return self.find_one(query)

    def find_diseases(self, tag='latest'):
        diseases_db = self.find_one_by_tag(tag)
        return diseases_db.diseases

    # Update
    def add_disease(self, tag, name):
        query = {"tag": tag}
        update = {"$push": {"diseases": name}}
        self.coll.find_one_and_update(query, update)



