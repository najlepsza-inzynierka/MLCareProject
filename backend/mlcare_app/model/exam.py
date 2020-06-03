from .model_document import ModelDocument
from .visit import Visit


class Exam(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      name: string,
      visitId: ObjectId,
      date: string,        # unique
      features: list[Feature]
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def name(self):
        return self._data['name']

    @name.setter
    def name(self, new_name):
        self._data['name'] = new_name

    @property
    def date(self):
        return self._data['date']

    @date.setter
    def date(self, new_date):
        self._data['date'] = new_date

    @property
    def visit_id(self):
        return self._data['visitId']

    @visit_id.setter
    def visit_id(self, new_visit_id):
        self._data['visitId'] = new_visit_id

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
