from mlcare_app import bcrypt
from mlcare_app.model.model_document import ModelDocument


class User(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      userId: string,        # unique
      firstName: string,
      middleName: string,
      lastName: string,
      title: string,
      address: string,
      phoneNumber: string,
      email: string,
      institutions: list[Institution],
      active: boolean
      password: encrypted string    # max 72B
      registeredOn: DateTime
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def user_id(self):
        return self._data['userId']

    @user_id.setter
    def user_id(self, new_id):
        self._data['userId'] = new_id

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
    def title(self):
        return self._data['title']

    @title.setter
    def title(self, new_title):
        self._data['title']: int = new_title

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
    def password(self):
        return self._data['password']

    @password.setter
    def password(self, new_password):
        self._data['password'] = bcrypt.generate_password_hash(
            new_password).decode('utf-8')
        # pass

    @property
    def active(self):
        return self._data['active']

    @active.setter
    def active(self, new_state):
        self._data['active'] = new_state

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
