# LOKAGER — lokager.com

**Where Property Meets Trust.**

Module 0: official launch ceremony + core frontend foundation.

- `/` — launch ceremony (once per browser), then Coming Soon
- `/launch` — ceremony always available for rehearsal/demos
- Report: `docs/LOKAGER_Module_0_Technology_Report.md`

## Stack
React 18 (CRA + craco) · Tailwind · shadcn/ui · Framer Motion · react-i18next · FastAPI (`/api/health` only)

## Run
```
cd frontend && yarn install && yarn start
cd backend && pip install -r requirements.txt && uvicorn server:app --port 8001
```
