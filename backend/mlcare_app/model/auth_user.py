import datetime

import jwt
import json

from mlcare_app import bcrypt, app, MongoJSONEncoder
from mlcare_app.database.token_dao import TokenDAO
from mlcare_app.model.exceptions import BlacklistedTokenException
from mlcare_app.model.model_document import ModelDocument


class AuthUser(ModelDocument):
    """
    JSON format:
    {
      _id: ObjectId,
      firstName: string,
      middleName: string,
      lastName: string,
      address: string,
      phoneNumber: string,
      email: string,                # unique
      active: boolean
      password: encrypted string    # max 72B
      registeredOn: DateTime,
    }
    """

    def __init__(self, data):
        super().__init__(data)

        # uses specified setters
        self.registered_on = self.registered_on

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

    def remove_password(self):
        self._data.pop('password')

    def encode_auth_token(self):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(
                    minutes=120),
                'iat': datetime.datetime.utcnow(),
                'sub': MongoJSONEncoder().encode(self.id)
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Decodes the auth token
        :param auth_token: authentication token to decode
        :return: token string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'),
                                 algorithm='HS256')
            token_dao = TokenDAO()
            if token_dao.find_one_by_token(auth_token):
                raise BlacklistedTokenException('Token blacklisted. Please '
                                                'log in again.')
            return payload['sub'].strip('"')
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def __eq__(self, other):
        if self.__class__ != other.__class__:
            return False
        else:
            return self.__dict__ == other.__dict__

    def __str__(self):
        return str(self._data)
