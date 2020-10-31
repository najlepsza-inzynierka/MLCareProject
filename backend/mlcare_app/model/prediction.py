import datetime

from bson import ObjectId
import numpy as np

from .exceptions import PredictionFeatureException
from .model_document import ModelDocument
from ..database.diseases_dao import DiseaseDAO

STATUS_SUCCESS = 'success'
STATUS_FAILED = 'failure'


class Prediction(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      disease: string,
      visitId: ObjectId,
      date: string,        # unique
      model: string,
      predictedClass: string,
      accuracy: double,
      features: list[Feature],
      probabilityMap: map,
      classesMap: map,
      addedBy: ObjectId (user id)
      status: success/failure           # only for frontend after prediction
                                          is made
    }
    """

    def __init__(self, data):
        super().__init__(data)

        # uses specified setters
        self.visit_id = self.visit_id
        self.date = self.date if self.date else datetime.datetime.utcnow()
        self.features = self.features

    @property
    def disease(self):
        return self._data['disease']

    @disease.setter
    def disease(self, new_disease):
        self._data['disease'] = new_disease

    @property
    def visit_id(self):
        return self._data['visitId']

    @visit_id.setter
    def visit_id(self, new_visit_id):
        self._data['visitId'] = ObjectId(new_visit_id)

    @property
    def added_by(self):
        return self._data['addedBy']

    @added_by.setter
    def added_by(self, new_user_id):
        self._data['addedBy'] = ObjectId(new_user_id)

    @property
    def date(self):
        return self._data['date']

    @date.setter
    def date(self, new_date):
        self._data['date'] = str(new_date)

    @property
    def model(self):
        return self._data['model']

    @model.setter
    def model(self, new_model):
        self._data['model'] = new_model

    @property
    def predicted_class(self):
        return self._data['predicted_class']

    @predicted_class.setter
    def predicted_class(self, new_predicted_class):
        self._data['predicted_class'] = new_predicted_class

    @property
    def accuracy(self):
        return self._data['accuracy']

    @accuracy.setter
    def accuracy(self, new_accuracy):
        self._data['accuracy'] = new_accuracy

    @property
    def features(self):
        return self._data['features']

    @features.setter
    def features(self, new_features):
        for feature in new_features:
            value = feature['value']
            if isinstance(value, str):
                if value.lower() in ['true', 'false']:
                    value = value.lower() == 'true'
                else:
                    value = float(value)
                feature['value'] = value
        self._data['features'] = new_features

    @property
    def probability_map(self):
        return self._data['probability_map']

    @probability_map.setter
    def probability_map(self, new_map):
        self._data['probability_map'] = new_map

    @property
    def classes_map(self):
        return self._data['classes_map']

    @classes_map.setter
    def classes_map(self, new_map):
        self._data['classes_map'] = new_map

    @property
    def status(self):
        return self._data['status']

    @status.setter
    def status(self, new_status):
        self._data['status'] = new_status

    def filter_features(self):
        disease_dao = DiseaseDAO()
        disease_tag = '_'.join(self.disease.split()).lower()
        obligatory_features = (
            disease_dao.find_obligatory_features_by_disease_tag(disease_tag))
        all_features = disease_dao.find_all_features_by_disease_tag(disease_tag)
        filtered_features = [f for f in self.features if f['name']
                             in all_features]
        for f in filtered_features:
            if f['name'] in all_features:
                all_features.remove(f['name'])
            if f['name'] in obligatory_features:
                obligatory_features.remove(f['name'])

        if any(obligatory_features):
            raise PredictionFeatureException(f'Those obligatory features are '
                                             f'not filled {obligatory_features}')
        for feature in all_features:
            filtered_features.append({
                'name': feature,
                'value': np.nan
            })
        self.features = filtered_features

    def prepare_to_db(self):
        self.features = [f for f in self.features if f['value'] != np.nan]
        return self

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
