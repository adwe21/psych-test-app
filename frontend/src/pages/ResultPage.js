import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultPage = () => {
  const navigate = useNavigate();
  const [riskLevel, setRiskLevel] = useState('low');
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    // Calculate risk level based on answers
    const savedAnswers = localStorage.getItem('psychTestAnswers');
    if (!savedAnswers) {
      navigate('/');
      return;
    }
    
    const answers = JSON.parse(savedAnswers);
    let totalScore = 0;
    
    // Calculate PHQ-9 score (questions phq1-phq5)
    for (let i = 1; i <= 5; i++) {
      const key = `phq${i}`;
      if (answers[key] !== undefined) {
        totalScore += parseInt(answers[key]);
      }
    }
    
    // Calculate GAD-7 score (questions gad1-gad5)
    for (let i = 1; i <= 5; i++) {
      const key = `gad${i}`;
      if (answers[key] !== undefined) {
        totalScore += parseInt(answers[key]);
      }
    }
    
    setScore(totalScore);
    
    // Determine risk level
    if (totalScore >= 15) {
      setRiskLevel('high');
    } else if (totalScore >= 8) {
      setRiskLevel('medium');
    } else {
      setRiskLevel('low');
    }
  }, [navigate]);
  
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'high': return 'bg-red-100 border-danger text-danger';
      case 'medium': return 'bg-yellow-100 border-yellow-400 text-yellow-700';
      default: return 'bg-green-100 border-green-400 text-green-700';
    }
  };
  
  const getRiskText = () => {
    switch (riskLevel) {
      case 'high': return '高风险';
      case 'medium': return '中等风险';
      default: return '低风险';
    }
  };
  
  const getRecommendation = () => {
    switch (riskLevel) {
      case 'high':
        return '您的测试结果显示可能存在严重的心理健康问题。建议您立即联系心理健康专业人士或拨打心理危机干预热线。不要独自面对这些问题，寻求帮助是勇敢的表现。';
      case 'medium':
        return '您的测试结果显示可能存在一些心理健康困扰。建议您与信任的人分享您的感受，并考虑咨询心理健康专业人士获取支持和指导。';
      default:
        return '您的测试结果显示目前心理健康状况良好。保持健康的生活方式和积极的社交活动有助于维持良好的心理状态。如果未来出现困扰，请随时使用本工具重新评估。';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-text mb-6">测试结果</h1>
        
        <div className={`border-l-4 p-4 mb-6 ${getRiskColor()}`}>
          <h2 className="font-bold text-lg mb-2">风险等级: {getRiskText()}</h2>
          <p>总分: {score}/30</p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">专业建议:</h3>
          <p>{getRecommendation()}</p>
        </div>
        
        {riskLevel === 'high' && (
          <div className="bg-red-50 border border-danger rounded p-4 mb-6">
            <h3 className="font-bold text-danger mb-2">紧急情况提示:</h3>
            <p>如果您有伤害自己或他人的想法，请立即拨打心理危机干预热线或前往最近的医院急诊室。</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/emergency')}
            className="flex-1 bg-danger hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            紧急联系方式
          </button>
          <button
            onClick={() => navigate('/test')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-text font-bold py-2 px-4 rounded transition duration-300"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;