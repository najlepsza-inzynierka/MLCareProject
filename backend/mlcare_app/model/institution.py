from mlcare_app.model.model_document import ModelDocument


class Institution(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      institutionName: string,
      address: string,
      phoneNumber: string,
      email: string,                # unique
      admins: list[Admin],
      usersLimit: int,
      usersNo: int,
      registeredOn: datetime
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def institution_name(self):
        return self._data['institutionName']

    @institution_name.setter
    def institution_name(self, new_name):
        self._data['institutionName'] = new_name

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
    def user_no(self):
        return self._data['usersNo']

    @user_no.setter
    def user_no(self, new_number):
        self._data['usersNo'] = new_number

    @property
    def user_limit(self):
        return self._data['usersLimit']

    @user_limit.setter
    def user_limit(self, new_limit):
        self._data['usersLimit'] = new_limit

    @property
    def registered_on(self):
        return self._data['registeredOn']

    @registered_on.setter
    def registered_on(self, new_date):
        self._data['registeredOn'] = str(new_date)

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
