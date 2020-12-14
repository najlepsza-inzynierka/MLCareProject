from .model_document import ModelDocument


class Patient(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      patientId: string,        # unique
      firstName: string,
      middleName: string,
      lastName: string,
      gender: int,               # 0 male, 1 female
      address: string,
      phoneNumber: string,
      email: string,
      birthDate: date,
      birthPlace: string,
      visits: list[Visit]
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def patient_id(self):
        return self._data['patientId']

    @patient_id.setter
    def patient_id(self, new_id):
        self._data['patientId'] = new_id

    @property
    def first_name(self):
        return self._data['firstName']

    @first_name.setter
    def first_name(self, new_name):
        self._data['firstName'] = new_name

    @property
    def middle_name(self):
        return self._data['middleName']

    @middle_name.setter
    def middle_name(self, new_name):
        self._data['middleName'] = new_name

    @property
    def last_name(self):
        return self._data['lastName']

    @last_name.setter
    def last_name(self, new_name):
        self._data['lastName'] = new_name

    @property
    def gender(self):
        return self._data['gender']

    @gender.setter
    def gender(self, new_gender):
        self._data['gender']: int = new_gender

    @property
    def address(self):
        return self._data['address']

    @address.setter
    def address(self, new_address):
        self._data['address'] = new_address

    @property
    def phone_no(self):
        return self._data['phoneNumber']

    @phone_no.setter
    def phone_no(self, new_no):
        self._data['phoneNumber'] = new_no

    @property
    def email(self):
        return self._data['email']

    @email.setter
    def email(self, new_email):
        self._data['email'] = new_email

    @property
    def birth_date(self):
        return self._data['birthDate']

    @birth_date.setter
    def birth_date(self, new_date):
        self._data['birthDate'] = new_date

    @property
    def birth_place(self):
        return self._data['birthPlace']

    @birth_place.setter
    def birth_place(self, new_place):
        self._data['birthPlace'] = new_place

    def count_patient_age(self):
        import datetime
        now = datetime.datetime.now()
        return now.year - int(self.birth_date[:4])

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
