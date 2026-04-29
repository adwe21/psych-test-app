from fastapi import APIRouter, HTTPException
from app.schemas import TestAnswers, RiskAssessment

router = APIRouter()

@router.post("/assess", response_model=RiskAssessment)
async def assess_risk(answers: TestAnswers):
    """
    Assess psychiatric risk based on test answers
    """
    if not answers.answers:
        raise HTTPException(status_code=400, detail="No answers provided")
    
    # Calculate total score
    total_score = sum(answers.answers.values())
    
    # Determine risk level and recommendation
    if total_score >= 15:
        risk_level = "high"
        recommendation = "您的测试结果显示可能存在严重的心理健康问题。建议您立即联系心理健康专业人士或拨打心理危机干预热线。不要独自面对这些问题，寻求帮助是勇敢的表现。"
    elif total_score >= 8:
        risk_level = "medium"
        recommendation = "您的测试结果显示可能存在一些心理健康困扰。建议您与信任的人分享您的感受，并考虑咨询心理健康专业人士获取支持和指导。"
    else:
        risk_level = "low"
        recommendation = "您的测试结果显示目前心理健康状况良好。保持健康的生活方式和积极的社交活动有助于维持良好的心理状态。如果未来出现困扰，请随时使用本工具重新评估。"
    
    return RiskAssessment(
        score=total_score,
        risk_level=risk_level,
        recommendation=recommendation
    )