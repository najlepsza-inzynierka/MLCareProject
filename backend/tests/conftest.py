import os

import pytest
from bson import ObjectId


def pytest_sessionstart(session):
    with open('.testenv') as f:
        for line in f.readlines():
            [key, value] = line.strip().split('=', 1)
            os.environ[key] = value
    # import pdb
    # pdb.set_trace()
    from mlcare_app.database import clean_db
    clean_db()


@pytest.fixture(scope="session")
def admin_token():
    return None


@pytest.fixture(scope="session", autouse=True)
def client():
    from mlcare_app import app
    app.config['TESTING'] = True

    with app.test_client() as client:
        with client.session_transaction() as session:
            session['Authorization'] = 'redacted'
        print(session)  # will be populated SecureCookieSession
        yield client

    # os.close(db_fd)
    # os.unlink(app.config['DATABASE'])


@pytest.fixture(scope='session')
def tmp_memory():
    return {}


@pytest.fixture()
def prediction():
    from mlcare_app.model.prediction import Prediction
    return Prediction({
        "disease": "acute_inflammations",
        "visitId": ObjectId(),
        "features": []
                      })


# pytest fixtures with features lists for acute_inflammations model
@pytest.fixture
def all_of_model_features():
    return [
        {"name": "urine_pushing", "value": "True"},
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
        {"name": "temperature", "value": "37.1"},
        {"name": "urethra_burning", "value": "False"},
        {"name": "nausea", "value": "False"}
    ]


@pytest.fixture
def not_all_of_model_all_obligatory_features():
    return [
        {"name": "urine_pushing", "value": "True"},
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
        {"name": "temperature", "value": "37.1"}
    ]


@pytest.fixture
def not_all_of_model_not_all_obligatory_features():
    return [
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
        {"name": "temperature", "value": "37.1"}
    ]


@pytest.fixture
def obligatory_only_features():
    return [
        {"name": "urine_pushing", "value": "True"},
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
    ]


@pytest.fixture
def more_than_model_all_obligatory_features():
    return [
        {"name": "Age", "value": 22},
        {"name": "BMI", "value": 23.7},
        {"name": "Glucose", "value": 73},
        {"name": "Insulin", "value": 3.01},
        {"name": "HOMA", "value": 0.61245},
        {"name": "Leptin", "value": 8.7657},
        {"name": "Adiponectin", "value": 13.11},
        {"name": "Resistin", "value": 6.92},
        {"name": "MCP.1", "value": 711.33},
        {"name": "urine_pushing", "value": "True"},
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
        {"name": "worst_perimeter", "value": "184.6"},
        {"name": "worst_concave_points", "value": "0.2654"},
        {"name": "mean_concave_points", "value": "0.1471"}
    ]


@pytest.fixture
def more_than_model_not_all_obligatory_features():
    return [
        {"name": "Age", "value": 22},
        {"name": "BMI", "value": 23.7},
        {"name": "micturition_pains", "value": "True"},
        {"name": "lumbar_pain", "value": "True"},
    ]