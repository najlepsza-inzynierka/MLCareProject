import datetime

from bson import ObjectId

from . import db
from model.disease_db import DiseaseDB


class DiseaseDAO:
    def __init__(self):
        self.coll = db['diseases']

    # Create
    def add_disease_db(self):
        old_latest = self.find_one_by_tag('latest')
        if old_latest:
            old_latest.tag = str(old_latest.date) + '_end'
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

    def find_one_by_disease_tag(self, disease):
        diseases = self.find_diseases()
        return [d for d in diseases if d['disease_tag'] == disease][0]

    def find_latest_db(self):
        return self.find_one_by_tag('latest')

    def find_diseases(self, tag='latest'):
        diseases_db = self.find_one_by_tag(tag)
        return diseases_db.diseases

    def find_obligatory_features_by_disease_tag(self, disease):
        found_disease = self.find_one_by_disease_tag(disease)
        features = found_disease['feature_importances']['top_3']
        return [item[0] for item in features]

    def find_all_features_by_disease_tag(self, disease):
        found_disease = self.find_one_by_disease_tag(disease)
        features = found_disease['feature_importances']['all']
        return [item[0] for item in features]

    def find_diseases_by_features(self, features):
        features = set(features)
        disease_db = self.find_diseases()
        diseases_found = []
        for disease in disease_db:
            obligatory = [d[0] for d in disease['feature_importances'][
                'top_3']]
            if all([feature in features for feature in obligatory]):
                diseases_found.append(disease['name'])
        return diseases_found

    # Update
    def add_disease(self, tag, disease_info):
        query = {"tag": tag}
        update = {"$push": {"diseases": disease_info}}
        self.coll.find_one_and_update(query, update)



