import os
from pymongo import MongoClient
from mlcare_app import app

app.config['MONGO_DBNAME'] = 'doctor_office'

_db_conn_string = "mongodb+srv://%s:%s@%s" % (
    os.environ["DB_USERNAME"], os.environ["DB_PASSWORD"],
    os.environ["DB_HOSTNAME"]
)
app.config['MONGO_URI'] = _db_conn_string
app.config['SECRET_KEY'] = os.environ['SECRET_KEY']
connection = MongoClient(_db_conn_string)
db = connection[os.environ["DB_NAME"]]
