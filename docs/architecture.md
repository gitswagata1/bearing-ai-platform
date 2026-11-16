# Architecture

## Overview

A two-tier application: a Next.js dashboard and a FastAPI service connected by JSON over
HTTP.

```
Browser ──► Next.js (3000) ──► FastAPI (8000) ──► routers/*.py
                  │
                  └── backend unreachable ──► frontend/src/lib/demo-data.ts
```

## Backend

- `backend/main.py` creates the FastAPI app, enables CORS and registers one router per
  domain.
- Each file in `backend/routers/` owns a URL prefix (`/api/inspect`, `/api/quote`,
  `/api/failure`, `/api/maintenance`, `/api/sourcing`), its Pydantic request and response
  models, and its endpoint logic.
- Current endpoint logic generates simulated results. The response models define the
  contract the frontend relies on.

## Frontend

- `src/app/<module>/page.tsx` is one page per module.
- `src/lib/api.ts` wraps `fetch`. Each call resolves to `{ data, demo }`; when the request
  fails, `demo` is `true` and the page renders from `src/lib/demo-data.ts`.
- `DemoBanner` makes demo mode visible to the user.

## Conventions

| Concern          | Rule                                                           |
| ---------------- | -------------------------------------------------------------- |
| New domain       | Add `backend/routers/<name>.py`, register it in `main.py`      |
| Response shape   | Define a Pydantic model; mirror it in the frontend types       |
| Secrets          | Environment files only; `.env*` is git-ignored except examples |
