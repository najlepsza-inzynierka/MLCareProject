from mlcare_app.model.model_document import ModelDocument


class BlacklistedToken(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      token: str,
      blacklisted_on: datetime
    }
    """

    def __init__(self, data, token=None):
        super().__init__(data)
        if token:
            self.token = token

    @property
    def token(self):
        return self._data['token']

    @token.setter
    def token(self, new_token):
        self._data['token'] = new_token

    @property
    def blacklisted_on(self):
        return self._data['blacklistedOn']

    @blacklisted_on.setter
    def blacklisted_on(self, new_blacklisted_on):
        self._data['blacklistedOn'] = new_blacklisted_on
