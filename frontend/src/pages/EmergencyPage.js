import React from 'react';

const EmergencyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-text mb-6">紧急联系方式</h1>
        
        <div className="bg-red-50 border-l-4 border-danger p-4 mb-6">
          <h2 className="font-bold text-danger mb-2">心理危机干预热线</h2>
          <p className="text-2xl font-bold">400-161-9995</p>
          <p className="text-sm mt-1">希望24热线 · 全天候服务</p>
        </div>
        
        <div className="mb-6">
          <h2 className="font-semibold mb-3">其他重要联系方式</h2>
          <ul className="space-y-3">
            <li className="border-b pb-3">
              <h3 className="font-medium">北京心理危机研究与干预中心</h3>
              <p>电话: 010-82951332</p>
              <p>服务时间: 24小时</p>
            </li>
            <li className="border-b pb-3">
              <h3 className="font-medium">上海心理援助热线</h3>
              <p>电话: 021-12320-5</p>
              <p>服务时间: 24小时</p>
            </li>
            <li className="border-b pb-3">
              <h3 className="font-medium">广州心理援助热线</h3>
              <p>电话: 020-81899120</p>
              <p>服务时间: 24小时</p>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-primary rounded p-4 mb-6">
          <h2 className="font-bold text-primary mb-2">紧急情况处理指南</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>如果您或他人有立即的危险，请拨打110或120</li>
            <li>前往最近的医院急诊室</li>
            <li>联系信任的家人或朋友陪伴</li>
            <li>不要独处，保持与他人的联系</li>
          </ol>
        </div>
        
        <div className="text-center">
          <a 
            href="/" 
            className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;