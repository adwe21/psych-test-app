import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  
  // PHQ-9 and GAD-7 questions
  const questions = [
    // PHQ-9 (Depression)
    { id: 'phq1', text: '过去两周内，您感到心情低落、抑郁或绝望的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'phq2', text: '过去两周内，您对做事提不起兴趣或乐趣的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'phq3', text: '过去两周内，您感到睡眠问题（失眠或嗜睡）的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'phq4', text: '过去两周内，您感到疲倦或精力不足的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'phq5', text: '过去两周内，您食欲不振或暴饮暴食的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    
    // GAD-7 (Anxiety)
    { id: 'gad1', text: '过去两周内，您感到紧张、焦虑或急切的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'gad2', text: '过去两周内，您无法停止或控制担忧的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'gad3', text: '过去两周内，您对各种事情过度担忧的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'gad4', text: '过去两周内，您难以放松的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
    { id: 'gad5', text: '过去两周内，您因焦虑而坐立不安或感到烦躁的频率是？', options: ['完全不会', '几天', '超过一半的天数', '几乎每天'] },
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save answers to localStorage and navigate to results
      localStorage.setItem('psychTestAnswers', JSON.stringify(answers));
      navigate('/result');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentQuestion = questions[currentStep];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">症状自测</h2>
            <span className="text-sm text-gray-500">{currentStep + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-text mb-4">{currentQuestion.text}</p>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQuestion.id, index)}
                className={`w-full text-left p-3 rounded border ${
                  answers[currentQuestion.id] === index 
                    ? 'border-primary bg-blue-50 text-primary' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded ${
              currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-200 hover:bg-gray-300 text-text'
            }`}
          >
            上一步
          </button>
          <button
            onClick={nextStep}
            disabled(answers[currentQuestion.id] === undefined)
            className={`px-4 py-2 rounded ${
              answers[currentQuestion.id] === undefined
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary hover:bg-blue-700 text-white'
            }`}
          >
            {currentStep === questions.length - 1 ? '查看结果' : '下一步'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestPage;