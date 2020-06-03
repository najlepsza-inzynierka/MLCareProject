from mlcare_app.model.exceptions import PredictionException
from mlcare_app.model.feature import Feature
from mlcare_app.model.prediction import Prediction
import xgboost as xgb
import pandas as pd

model_dir = 'mlcare_app/machine_learning/'

result_map = {'breast_cancer_coimbra': {1: 'Healthy', 2: 'Unhealthy'}}


def choose_model(disease):
    disease_map = {'breast_cancer': 'breast_cancer_coimbra',
                   'inflammation': 'acute_inflammations',
                   'cardiovascular': 'cardiovascular'}
    disease = disease.lower().replace(' ', '_')
    return disease_map.get(disease, False)


def create_dataframe(features):
    feature_dict = {}
    for feature in features:
        feature = Feature(feature)
        feature_dict[feature.name] = [feature.value]
    return pd.DataFrame(data=feature_dict)


def predict(prediction: Prediction):
    model_name = choose_model(prediction.disease)
    if not model_name:
        raise PredictionException('Cannot find model for given disease')
    model = xgb.XGBClassifier()
    model.load_model(model_dir + model_name + '.model')
    data = create_dataframe(prediction.features)
    ypred = model.predict(data.values)
    prediction.predicted_class = result_map[model_name][ypred[0]]
    prediction.model = model_name
    return prediction
