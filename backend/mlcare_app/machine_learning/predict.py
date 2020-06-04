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
    # dtest = xgb.DMatrix(data.values)
    res = model.predict_proba(data)
    classes_names = [str(class_name) for class_name in model.classes_]
    probabilities = [float(prob) for prob in res[0]]
    prediction.probability_map = (dict(zip(classes_names, probabilities)))
    # prediction.classes_map = result_map[model_name]
    index = list(res[0]).index(max(res[0]))
    prediction.predicted_class = str(model.classes_[index])
    prediction.model = model_name
    return prediction
