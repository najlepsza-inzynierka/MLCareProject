import datetime

from mlcare_app.model.auth_user import AuthUser


class User(AuthUser):
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
      registeredOn: DateTime,
      registeredBy: ObjectId (admin id)
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
    def title(self):
        return self._data['title']

    @title.setter
    def title(self, new_title):
        self._data['title']: int = new_title

    @property
    def registered_by(self):
        return self._data['registeredBy']

    @registered_by.setter
    def registered_by(self, new_admin):
        self._data['registeredBy'] = str(new_admin)
