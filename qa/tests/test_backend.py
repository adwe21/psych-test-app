import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()

def test_assess_risk_low():
    answers = {
        "answers": {
            "phq1": 0,
            "phq2": 0,
            "phq3": 0,
            "phq4": 0,
            "phq5": 0,
            "gad1": 0,
            "gad2": 0,
            "gad3": 0,
            "gad4": 0,
            "gad5": 0
        }
    }
    response = client.post("/api/assess", json=answers)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 0
    assert data["risk_level"] == "low"

def test_assess_risk_medium():
    answers = {
        "answers": {
            "phq1": 1,
            "phq2": 1,
            "phq3": 1,
            "phq4": 1,
            "phq5": 1,
            "gad1": 1,
            "gad2": 1,
            "gad3": 1,
            "gad4": 1,
            "gad5": 1
        }
    }
    response = client.post("/api/assess", json=answers)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 10
    assert data["risk_level"] == "medium"

def test_assess_risk_high():
    answers = {
        "answers": {
            "phq1": 3,
            "phq2": 3,
            "phq3": 3,
            "phq4": 3,
            "phq5": 3,
            "gad1": 3,
            "gad2": 3,
            "gad3": 3,
            "gad4": 3,
            "gad5": 3
        }
    }
    response = client.post("/api/assess", json=answers)
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 30
    assert data["risk_level"] == "high"

def test_assess_empty_answers():
    answers = {"answers": {}}
    response = client.post("/api/assess", json=answers)
    assert response.status_code == 400