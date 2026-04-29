# 24小时精神病测试网页App - 完整交付流水线

## 项目概述
本项目实现了一个简洁、专业的在线精神病症状自测工具，帮助用户初步评估心理健康状况。应用采用React + FastAPI技术栈，遵循拼过官网的UI风格（简洁、卡片式、蓝白主色）。

## 功能模块
1. **症状自测**：基于PHQ-9和GAD-7标准化量表的交互式问卷
2. **风险评估**：根据用户回答自动计算风险等级（低、中、高）
3. **专业建议**：针对不同风险等级提供相应的专业建议
4. **紧急联系**：提供心理危机干预热线和紧急联系方式

## 技术架构
- **前端**: React + Tailwind CSS
- **后端**: FastAPI
- **部署**: Docker + Nginx (单端口)
- **本地运行**: 提供run-local.sh脚本

## 目录结构
```
psych-test-app/
├── product.md          # 产品需求文档
├── design.md           # 设计文档
├── frontend/           # 前端代码
│   ├── package.json
│   ├── tailwind.config.js
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── backend/            # 后端代码
│   ├── requirements.txt
│   └── app/
│       ├── main.py
│       ├── api.py
│       └── schemas.py
├── qa/                 # 质量保证
│   ├── test_plan.md
│   └── tests/
├── deploy/             # 部署配置
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── nginx.conf
│   ├── run-local.sh    # 本地运行脚本
│   └── control-plane.sh # 24小时监控控制平面
└── README.md
```

## 运行说明

### 本地运行
```bash
cd deploy
./run-local.sh
```
- 前端: http://localhost:3000
- 后端: http://localhost:8000

### Docker部署
```bash
cd deploy
docker-compose up -d
```
- 应用: http://localhost:8080

### 24小时监控
```bash
cd deploy
./control-plane.sh
```
此脚本将确保应用持续运行24小时，自动恢复任何崩溃。

## 测试
后端API测试已通过:
```bash
cd backend
python -m pytest ../qa/tests/test_backend.py
```

## 注意事项
1. 本工具仅用于初步自测，不能替代专业诊断
2. 用户数据仅保存在本地浏览器中，不会上传或存储
3. 高风险用户会自动显示紧急联系方式