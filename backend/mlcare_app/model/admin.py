from mlcare_app.database.institution_dao import InstitutionDAO
from mlcare_app.model.auth_user import AuthUser


class Admin(AuthUser):
    """
    JSON format:
    {
      _id: ObjectId,
      firstName: string,
      middleName: string,
      lastName: string,
      address: string,
      phoneNumber: string,
      email: string,
      institutionId: ObjectId,
      active: boolean,
      password: encrypted string,    # max 72B
      registeredOn: DateTime
    }
    """

    def __init__(self, data):
        super().__init__(data)

    @property
    def institution_id(self):
        return self._data['institutionId']

    @institution_id.setter
    def institution_id(self, new_id):
        self._data['institutionId'] = new_id

    @property
    def institution(self):
        return self._data['institution']

    @institution.setter
    def institution(self, new_institution):
        self._data['institution'] = new_institution

    def prepare_to_send(self):
        institution_dao = InstitutionDAO()
        self.institution = institution_dao.find_one_by_id(
            self.institution_id).data
        self.remove_password()
