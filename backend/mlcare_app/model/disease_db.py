from model.model_document import ModelDocument


class DiseaseDB(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      tag: string,
      date: string,        # unique
      diseases: list[string]
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def tag(self):
        return self._data['tag']

    @tag.setter
    def tag(self, new_tag):
        self._data['tag'] = new_tag

    @property
    def date(self):
        return self._data['date']

    @date.setter
    def date(self, new_date):
        self._data['date'] = new_date

    @property
    def diseases(self):
        return self._data['diseases']

    @diseases.setter
    def diseases(self, new_diseases):
        self._data['diseases'] = new_diseases
