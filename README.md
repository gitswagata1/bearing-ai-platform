# BearingAI — AI Bearing Manufacturing Platform

An AI-assisted platform for bearing manufacturers. A FastAPI backend exposes
inspection, quotation, failure-analysis, predictive-maintenance and sourcing
services, and a Next.js dashboard presents them in one interface.

## Modules

| Module               | What it does                                                   |
| -------------------- | -------------------------------------------------------------- |
| Visual inspection    | Upload a bearing image and get a defect analysis plus statistics |
| Quotation            | Generate price quotes and review quote history                 |
| Failure analysis     | Diagnose failure causes and browse known failure patterns      |
| Predictive maintenance | Machine health scores and active alerts                      |
| Sourcing intelligence | Demand forecast, supplier scoring and a sourcing recommendation |

## Tech stack

- **Backend:** Python, FastAPI, Pydantic, Uvicorn, Pillow, NumPy
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS 4
- **AI:** Anthropic API

## Getting started

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env            # add your ANTHROPIC_API_KEY
uvicorn main:app --reload --port 8000
```

Interactive API docs are served at http://localhost:8000/docs.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                     # http://localhost:3000
```

## API overview

| Method | Endpoint                | Description                   |
| ------ | ----------------------- | ----------------------------- |
| POST   | `/api/inspect`           | Analyse a bearing image       |
| GET    | `/api/inspect/stats`     | Inspection statistics         |
| POST   | `/api/quote`            | Create a quotation            |
| GET    | `/api/quote/history`    | Quotation history             |
| POST   | `/api/failure/analyze`      | Failure analysis              |
| GET    | `/api/failure/patterns`     | Known failure patterns        |
| GET    | `/api/maintenance/machines` | Machine health                |
| GET    | `/api/maintenance/alerts`   | Maintenance alerts            |
| GET    | `/api/sourcing/forecast`    | Demand forecast               |
| GET    | `/api/sourcing/suppliers`   | Supplier scores               |
| GET    | `/api/sourcing/recommendation` | Sourcing recommendation    |

## Project structure

```
backend/
├── main.py            FastAPI app, CORS and router registration
├── routers/           One module per domain (inspection, quotation, ...)
└── requirements.txt
frontend/
├── src/app/           One route per module
├── src/components/    Sidebar and shared UI
└── src/lib/           API client helpers
```

## Author

**Swagata Banerjee** — [GitHub](https://github.com/gitswagata1)
