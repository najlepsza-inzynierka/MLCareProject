""" Tests for features filtration for acute_inflammation model"""
import pytest

from mlcare_app.model.exceptions import PredictionFeatureException
from mlcare_app.model.prediction import Prediction
import numpy as np


def _assert_features(expected_dict, given):
    assert len(given) == len(expected_dict), (
        f'Expected {len(expected_dict)} but got {len(given)}')
    given_dict = {f['name']: f['value'] for f in given}
    for feature in given_dict:
        assert (expected_dict[feature] == given_dict[feature]
                or expected_dict[feature] is given_dict[feature]), (
            f'Expected {expected_dict[feature]} for {feature} but got '
            f'{given_dict[feature]}')


def test_all_of_model(all_of_model_features, prediction):
    prediction.features = all_of_model_features
    prediction.filter_features()

    expected_dict = {
        "urine_pushing": True, "micturition_pains": True,
        "lumbar_pain": True, "temperature": 37.1, "nausea": False,
        "urethra_burning": False}
    _assert_features(expected_dict, prediction.features)


def test_not_all_of_model_all_obligatory_features(
        not_all_of_model_all_obligatory_features, prediction):
    prediction.features = not_all_of_model_all_obligatory_features
    prediction.filter_features()

    expected_dict = {
        "urine_pushing": True, "micturition_pains": True,
        "lumbar_pain": True, "temperature": 37.1, "nausea": np.nan,
        "urethra_burning": np.nan}
    _assert_features(expected_dict, prediction.features)


def test_not_all_of_model_not_all_obligatory_features(
        not_all_of_model_not_all_obligatory_features, prediction):
    prediction.features = not_all_of_model_not_all_obligatory_features
    with pytest.raises(PredictionFeatureException) as e:
        prediction.filter_features()
    assert str(e.value) == ("Those obligatory features are "
                            f"not filled ['urine_pushing']")


def test_obligatory_only_features(obligatory_only_features, prediction):
    prediction.features = obligatory_only_features
    prediction.filter_features()
    expected_dict = {"urine_pushing": True, "micturition_pains": True,
                     "lumbar_pain": True, "temperature": np.nan,
                     "nausea": np.nan, "urethra_burning": np.nan}
    _assert_features(expected_dict, prediction.features)


def test_more_than_model_all_obligatory_features(
        more_than_model_all_obligatory_features, prediction):
    prediction.features = more_than_model_all_obligatory_features
    prediction.filter_features()
    expected_dict = {"urine_pushing": True, "micturition_pains": True,
                     "lumbar_pain": True, "temperature": np.nan,
                     "nausea": np.nan, "urethra_burning": np.nan}
    _assert_features(expected_dict, prediction.features)


def test_more_than_model_not_all_obligatory_features(
        more_than_model_not_all_obligatory_features, prediction):
    prediction.features = more_than_model_not_all_obligatory_features
    with pytest.raises(PredictionFeatureException) as e:
        prediction.filter_features()
    assert str(e.value) == ("Those obligatory features are "
                            f"not filled ['urine_pushing']")
