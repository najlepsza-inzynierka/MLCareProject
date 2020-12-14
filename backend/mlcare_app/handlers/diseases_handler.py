from datetime import datetime

from bson import ObjectId
from flask import jsonify, Blueprint, g

from app_setup import app
from database.diseases_dao import DiseaseDAO

from validate import expect_mime, json_body, check_token

diseases_bp = Blueprint('diseases', __name__)


# to make new latest disease database (e.g. changed api version)
@app.route('/api/diseases/new_latest', methods=['POST'])
def add_latest():
    """
    makes new latest disease database (e.g. for changed api version)
    """
    dao = DiseaseDAO()
    dao.add_disease_db()

    return jsonify({"confirmation": "OK"})


@app.route('/api/diseases', methods=['GET'])
@check_token
def get_diseases():
    """
    :return:
    [ {
        "name": "Disease Name",
        "disease_tag": "disease_tag",
        "feature_importances": {
            "all": [[feature_name, feature_importance], [...], ...],
            "top_3": [[...], ...],
            "last_3": [[...], ...]                    # top and last will change
       }, ...
    ]
    """
    dao = DiseaseDAO()
    result = dao.find_diseases()

    return jsonify(result)


@app.route('/api/diseases/obligatory/<disease>', methods=['GET'])
@check_token
def get_obligatory_features(disease):
    """
    :param disease: disease to search by
    :return:
    ["feature_name1", "feature_name2", "feature_name3]      # could be more
                                                              in future
    """
    dao = DiseaseDAO()
    disease_features = dao.find_obligatory_features_by_disease_tag(disease)
    return jsonify(disease_features)


@app.route('/api/diseases/multi_disease', methods=['GET'])
@expect_mime('application/json')
@json_body
@check_token
def get_diseases_by_features():
    """
    { "features": ["name1", "name2", ...]}

    :return
    ["disease1", "disease2", ...]
    """
    body = g.body
    features = body.get('features')
    disease_dao = DiseaseDAO()
    diseases = disease_dao.find_diseases_by_features(features)
    return jsonify(diseases)


# to add disease to latest diseases database
@app.route('/api/diseases/add_disease', methods=['PUT'])
@expect_mime('application/json')
@json_body
def add_disease():
    """
    adds disease to latest diseases database

    {
        "name": "Disease Name",
        "info": feature importances (format given in get_diseases)
    }
    """
    body = g.body

    disease = body.get('name')
    disease_info = body.get('info')
    disease_tag = '_'.join(disease.split()).lower()

    dao = DiseaseDAO()
    dao.add_disease('latest', {'name': disease,
                               'disease_tag': disease_tag,
                               'feature_importances': disease_info})

    return jsonify({'confirmation': 'OK'})
