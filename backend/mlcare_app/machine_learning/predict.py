from model.exceptions import PredictionException
from model.feature import Feature
from model.prediction import Prediction
import xgboost as xgb
import pandas as pd
# import shap
# import shap_fix


result_map = {'breast_cancer_coimbra': {False: 'Healthy', True: 'Unhealthy'},
              'acute_inflammations': {True: 'Unhealthy', False: 'Healthy'},
              'breast_cancer_wisconsin': {True: 'Unhealthy', False: 'Healthy'}}


def choose_model(disease):
    disease_map = {'breast_cancer_coimbra': 'breast_cancer_coimbra',
                   'acute_inflammations': 'acute_inflammations',
                   'breast_cancer_wisconsin': 'breast_cancer_wisconsin'}
    disease = disease.lower().replace(' ', '_')
    return disease_map.get(disease, False)


def create_dataframe(features):
    features_list = [Feature(feature) for feature in features]
    feature_dict = {feature.name: feature.value for feature in features_list}
    return pd.DataFrame(data=feature_dict, index=[0])


def predict(prediction: Prediction):
    model_name = choose_model(prediction.disease)
    if not model_name:
        raise PredictionException('Cannot find model for given disease')
    model = xgb.XGBClassifier()

    from pathlib import Path

    path = Path(__file__).parent
    path = path.joinpath(model_name + '.xgb')
    model.load_model(path.as_uri())
    data = create_dataframe(prediction.features)

    import pdb
    pdb.set_trace()
    # response is [[class%, 1-class%]]
    res = model.predict_proba(data)

    # translate names from model
    classes_names = [class_name for class_name in model.classes_]
    translated_names = [result_map[model_name][class_name] for class_name in classes_names]
    probabilities = [float(prob) for prob in res[0]]

    # adjust classes names to probabilities
    prediction.probability_map = (dict(zip(translated_names, probabilities)))

    # choose answer with bigger probability
    index = list(res[0]).index(max(res[0]))
    predicted_class = model.classes_[index]
    prediction.predicted_class = result_map[model_name][predicted_class]
    # prediction.image = str(explain_prediction_with_image(model, data))

    prediction.model = model_name

    return prediction


# def explain_prediction_with_image(
#         clf: xgb.XGBClassifier,
#         x: pd.DataFrame) \
#         -> base64:
#     """
#     Creates SHAP force plot to explain XGBoost prediction for a particular
#     sample x.
#     :param prediction_id: id of prediction to make chart for
#     :param clf: trained XGBoost classifier
#     :param x: Pandas DataFrame with sample that we want to explain
#     :return: image of SHAP force plot encoded to base64
#     """
#     explainer = shap.TreeExplainer(clf)
#     shap_values = explainer.shap_values(x.to_numpy())
#
#     fig = shap.force_plot(explainer.expected_value,
#                           shap_values=shap_values,
#                           features=x,
#                           show=False,
#                           matplotlib=True)
#
#     # "save" file to bytes buffer, since .savefig() version looks best and
#     # this way we don't do disk write/read
#     buffer = BytesIO()
#     fig.savefig(buffer,
#                 format='png',
#                 dpi=150,
#                 bbox_inches='tight')
#     buffer.seek(0)
#     image = buffer.read()
#     return base64.b64encode(image)
