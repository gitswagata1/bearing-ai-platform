from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import inspection, quotation, failure, maintenance, sourcing


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("\n" + "=" * 60)
    print("  BEARINGAI — AI Bearing Platform API")
    print("  Status: Running")
    print("  Docs:   http://localhost:8000/docs")
    print("=" * 60 + "\n")
    yield


app = FastAPI(
    title="BearingAI Bearing Platform API",
    description="AI-powered bearing manufacturing platform — visual inspection, quotation, failure analysis, predictive maintenance, and sourcing intelligence.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(inspection.router)
app.include_router(quotation.router)
app.include_router(failure.router)
app.include_router(maintenance.router)
app.include_router(sourcing.router)


@app.get("/", tags=["Health"])
async def root():
    return {
        "name": "BearingAI Bearing Platform",
        "version": "1.0.0",
        "status": "healthy",
        "modules": [
            "inspection",
            "quotation",
            "failure-analysis",
            "predictive-maintenance",
            "sourcing-intelligence",
        ],
    }


@app.get("/health", tags=["Health"])
async def health_check():
    return {"status": "ok"}
