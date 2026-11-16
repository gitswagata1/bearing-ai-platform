"""Smoke tests for every public API route."""
import pytest
from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_root_lists_all_modules():
    response = client.get("/")
    assert response.status_code == 200
    assert len(response.json()["modules"]) == 5


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


@pytest.mark.parametrize(
    "path",
    [
        "/api/inspect/stats",
        "/api/quote/history",
        "/api/failure/patterns",
        "/api/maintenance/machines",
        "/api/maintenance/alerts",
        "/api/sourcing/forecast",
        "/api/sourcing/suppliers",
        "/api/sourcing/recommendation",
    ],
)
def test_read_endpoints_return_json(path):
    response = client.get(path)
    assert response.status_code == 200
    assert response.json() is not None


def test_inspection_accepts_an_image():
    files = {"image": ("bearing.jpg", b"fake-image-bytes", "image/jpeg")}
    response = client.post("/api/inspect", files=files)
    assert response.status_code == 200


def test_quote_creation():
    payload = {
        "part_number": "6200-2RS",
        "quantity": 500,
        "customer_name": "Example Customer",
    }
    response = client.post("/api/quote", json=payload)
    assert response.status_code == 200
    assert response.json()["quantity"] == 500


def test_failure_analysis():
    payload = {
        "part_number": "6200-2RS",
        "description": "Noise and heat after 200 hours",
        "customer_name": "Example Customer",
    }
    response = client.post("/api/failure/analyze", json=payload)
    assert response.status_code == 200


def test_quote_requires_a_body():
    response = client.post("/api/quote", json={})
    assert response.status_code == 422
