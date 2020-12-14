import pytest
from flask import g

from mlcare_app.model.institution import Institution


@pytest.mark.order1
def test_create_institution(client):
    institution_data = {
        "institutionName": "Test Institution Z O.O.",
        "address": {
            "street": "Test Street 13/42",
            "city": "Test City",
            "code": "42-512"
        },
        "phoneNumber": "111 222 333",
        "email": "test.institution@mlcare.com",
        "usersLimit": "2"
    }

    rv = client.post('/api/institutions',
                     json=institution_data,
                     follow_redirects=True)
    assert rv._status_code == 200, f'{rv.status}'


@pytest.mark.order2
def test_get_institutions_no_admins(client):
    rv = client.get('/api/institutions')
    institutions = rv.get_json()
    assert len(institutions) == 1, (f'Expecded 1 institution but got '
                                    f'{len(institutions)}')
    institution = Institution(institutions[0])
    assert institution.institution_name == "Test Institution Z O.O."
    assert institution.address == {
            "street": "Test Street 13/42",
            "city": "Test City",
            "code": "42-512"
        }
    assert institution.phone_no == "111 222 333"
    assert institution.email == "test.institution@mlcare.com"
    assert institution.admins == []
    assert institution.users == []
    assert institution.user_limit == 2
    assert institution.user_no == 0
    # assert institution.registered_on == ""


def _get_institution_by_email(client, email):
    rv = client.get('/api/institutions')
    institutions = rv.get_json()
    for inst in institutions:
        if inst['email'] == email:
            return inst
    return None


@pytest.mark.order3
def test_create_admin(client, tmp_memory):
    inst = _get_institution_by_email(client, 'test.institution@mlcare.com')
    institution = Institution(inst)
    admin_data = {
        "firstName": "TestAdminName1",
        "middleName": "",
        "lastName": "TestAdminSurname1",
        "address": {
            "street": "Test Street 13/54",
            "city": "Test City",
            "code": "42-512"
        },
        "phoneNumber": "999 888 777",
        "email": "test.admin1@mlcare.com",
        "password": "tajnehaslo1"
    }

    rv = client.post(f'/api/institutions/{institution.id}/admin',
                     json=admin_data, follow_redirects=True)
    assert rv.status_code == 200, f'{rv.status}'
    tmp_memory['test_admin_id'] = rv.get_json()['new_id']


@pytest.mark.order4
def test_get_institutions_with_admin(client, tmp_memory):
    rv = client.get('/api/institutions')
    institutions = rv.get_json()
    assert len(institutions) == 1, (f'Expected 1 institution but got '
                                    f'{len(institutions)}')
    institution = Institution(institutions[0])
    assert institution.institution_name == "Test Institution Z O.O."
    assert institution.admins == [f'{tmp_memory["test_admin_id"]}']
    assert institution.users == []
    assert institution.user_limit == 2
    assert institution.user_no == 0


#TODO: pomyśleć o cucumberze nawet bez selenium