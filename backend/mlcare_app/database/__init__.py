import os
from pymongo import MongoClient

from app_setup import app

app.config['MONGO_DBNAME'] = 'doctor_office'

os.environ["DB_USERNAME"] = "Dev"
os.environ["DB_PASSWORD"] = "develop"
os.environ["DB_HOSTNAME"] = "mediclaster-b8qof.mongodb.net/test?retryWrites=true&w=majority"
os.environ['DB_NAME'] = "development"
os.environ['SECRET_KEY'] = "\xf8\x88\x8bC\x98\xfe\x1a\xe2\x8d\xe1p\x8b0\xea\xb6Z\xc6-\x9cI>\x10\xe2\x99"

_db_conn_string = "mongodb+srv://%s:%s@%s" % (
    os.environ["DB_USERNAME"], os.environ["DB_PASSWORD"],
    os.environ["DB_HOSTNAME"]
)
app.config['MONGO_URI'] = _db_conn_string
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
connection = MongoClient(_db_conn_string)
db = connection[os.environ["DB_NAME"]]


def clean_db():
    # only collection diseases remains
    collections = ['admins', 'exams', 'institutions', 'patients',
                   'predictions', 'tokens', 'users', 'visits']
    [db[collection].drop() for collection in collections]
