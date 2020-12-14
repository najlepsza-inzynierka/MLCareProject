import pytest


@pytest.mark.order1
def test_login_admin(client, admin_token):
    rv = client.post('/api/admins/login', json=dict(
        email='admin',
        password='supertajnehaslo'
    ), follow_redirects=True)
    assert rv._status_code == 200, f'{rv.status}'
    admin_token = rv.get_json().get('token')


# def test_admins_add(client):
#     pass
#
#
# def test_patients_get(client):
#     rv = client.get('/api/patients')
#     assert rv.get_json() == [], f'Expected data: [] but found {rv.get_json()}'
#
