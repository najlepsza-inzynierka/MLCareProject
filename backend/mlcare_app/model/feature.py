from .model_document import ModelDocument
from .visit import Visit


class Feature:
    """
    JSON format:
    {
      name: string,
      value: string,
      unit: string
    }
    """

    def __init__(self, data):
        self._data = data

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, new_data):
        self._data = new_data

    @property
    def name(self):
        return self._data['name']

    @name.setter
    def name(self, new_name):
        self._data['name'] = new_name

    @property
    def value(self):
        return self._data['value']

    @value.setter
    def value(self, new_value):
        self._data['value'] = new_value

    @property
    def unit(self):
        return self._data['unit']

    @unit.setter
    def unit(self, new_unit):
        self._data['unit'] = new_unit

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
