import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-primary mb-4">心理健康自测</h1>
        <p className="text-text mb-6">
          这是一个免费的心理健康自测工具，帮助您初步了解自己的心理状态。
          本测试基于专业量表，但不能替代专业诊断。如有严重困扰，请及时寻求专业帮助。
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">测试包含：</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>抑郁症状评估</li>
            <li>焦虑症状评估</li>
            <li>风险等级分析</li>
            <li>专业建议与资源</li>
          </ul>
        </div>
        <div className="bg-blue-50 border-l-4 border-primary p-4 mb-6">
          <p className="text-sm text-text">
            <strong>隐私声明：</strong>您的所有回答仅保存在本地浏览器中，不会被上传或存储。
          </p>
        </div>
        <a 
          href="/test" 
          className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300"
        >
          开始测试
        </a>
      </div>
    </div>
  );
};

export default HomePage;