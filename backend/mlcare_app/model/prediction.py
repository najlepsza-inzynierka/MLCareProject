from .model_document import ModelDocument
from .visit import Visit


class Prediction(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      disease: string,
      visitId: ObjectId,
      date: string,        # unique
      model: string,
      predicted_class: string,
      accuracy: double,
      features: list[Feature]
    }
    """

    def __init__(self, data):
        super().__init__(data)

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
        self._data['visitId'] = new_visit_id

    @property
    def date(self):
        return self._data['date']

    @date.setter
    def date(self, new_date):
        self._data['date'] = new_date

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
        self._data['features'] = new_features

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
