from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, jobs, applications
from app.middlewares.auth_middleware import get_current_user

app = FastAPI(title="Job Posting API")

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, tags=["Authentication"])
app.include_router(jobs.router, tags=["Jobs"])
app.include_router(applications.router, tags=["Applications"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Job Posting API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
