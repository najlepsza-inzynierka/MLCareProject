from mlcare_app.model.utils import parse_id


class ModelDocument:
    def __init__(self, data):
        data["_id"] = parse_id(data)
        self._data = data

    @property
    def data(self):
        return self._data

    @data.setter
    def data(self, new_data):
        self._data = new_data

    @property
    def id(self):
        return self._data["_id"]

    @id.setter
    def id(self, new_id):
        self._data["_id"] = new_id

    def __get__(self, instance, owner):
        return self._data
