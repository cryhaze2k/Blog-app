import requests
import pytest

BASE_URL = "http://localhost:8000"

def test_health_check():
    response = requests.get(f"{BASE_URL}/")
    assert response.status_code == 200

def test_get_posts_unauthorized():
    # Перевірка, що без токена доступ закритий
    response = requests.get(f"{BASE_URL}/posts")
    assert response.status_code == 401