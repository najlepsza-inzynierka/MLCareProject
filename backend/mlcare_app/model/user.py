import datetime

from database.institution_dao import InstitutionDAO
from model.auth_user import AuthUser


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
      email: string,          # email to login
      institutions: list[institution_id],
      emails: list[string],
      active: boolean,
      password: encrypted string,    # max 72B
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

    @property
    def institutions(self):
        return self._data['institutions']

    @institutions.setter
    def institutions(self, new_institutions):
        self._data['institutions'] = str(new_institutions)

    @property
    def emails(self):
        return self._data['emails']

    @emails.setter
    def emails(self, new_emails):
        self._data['emails'] = str(new_emails)

    def prepare_to_send(self):
        institution_dao = InstitutionDAO()
        self.institutions = institution_dao.find_all_from_list_by_id(
            self.institutions)
        self.remove_password()

    def prepare_to_send_for_institution(self):
        self.remove_password()
        return self.data


