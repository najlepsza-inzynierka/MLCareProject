from .model_document import ModelDocument


class Visit(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      doctorId: string,        # doctor id
      doctorName: string,      # doctor first and last name
      date: string,
      exams: list[Exam],
      predictions: list[Prediction]
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def doctor_id(self):
        return self._data['doctorId']

    @doctor_id.setter
    def doctor_id(self, new_id):
        self._data['doctorId'] = new_id

    @property
    def doctor_name(self):
        return self._data['doctorName']

    @doctor_name.setter
    def doctor_name(self, new_name):
        self._data['doctorName'] = new_name

    @property
    def date(self):
        return self._data['date']

    @date.setter
    def date(self, new_date):
        self._data['date'] = new_date

    @property
    def exams(self):
        return self._data['exams']

    @exams.setter
    def exams(self, new_exams):
        self._data['exams'] = new_exams

    @property
    def predictions(self):
        return self._data['predictions']

    @predictions.setter
    def predictions(self, new_predictions):
        self._data['predictions'] = new_predictions

    def add_exam(self, exam):
        exams_ids = [exam.id for exam in self._data['exams']]
        if exam.id not in exams_ids:
            self._data['exams'].append(exam)

    def add_prediction(self, prediction):
        predictions_ids = [prediction.id for prediction in self._data[
            'predictions']]
        if prediction.id not in predictions_ids:
            self._data['predictions'].append(prediction)

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
