from pydantic import BaseModel
from typing import Dict, Optional

class TestAnswers(BaseModel):
    answers: Dict[str, int]
    
class RiskAssessment(BaseModel):
    score: int
    risk_level: str  # low, medium, high
    recommendation: str