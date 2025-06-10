#!/usr/bin/env python3
"""
Simple script to run the FastAPI backend for testing
"""
import sys
import os

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    import uvicorn
    from backend.main import app
    
    print("Starting FastAPI backend...")
    print("API Documentation: http://localhost:8000/docs")
    print("Backend API: http://localhost:8000")
    
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)