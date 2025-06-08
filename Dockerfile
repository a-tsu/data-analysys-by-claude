# syntax=docker/dockerfile:1
# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Copy only dependency files first for better caching
COPY pyproject.toml uv.lock ./

# Install dependencies with cache mount for faster rebuilds
ENV UV_CACHE_DIR=/root/.cache/uv
ENV UV_LINK_MODE=copy
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --no-dev --frozen

# Copy application files (separate layer for code changes)
COPY app.py main.py start_offline.py ./
COPY ruff.toml ./

# Set environment variables for streamlit
ENV STREAMLIT_BROWSER_GATHER_USAGE_STATS=false
ENV STREAMLIT_TELEMETRY_DISABLED=true
ENV PLOTLY_RENDERER=json

# Expose the port
EXPOSE 8501

# Command to run the application
CMD ["uv", "run", "streamlit", "run", "app.py", "--server.address", "0.0.0.0", "--server.port", "8501", "--server.headless", "true"]