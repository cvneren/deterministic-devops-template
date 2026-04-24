# Stage 1: Builder
FROM python:3.11-slim AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY requirements.txt .
# Compile dependencies into wheels
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /build/wheels -r requirements.txt

# Stage 2: Runtime
FROM python:3.11-slim

# Set environment variables to prevent Python from writing .pyc files and to ensure output is not buffered
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Copy the built wheels and requirements from the builder stage
COPY --from=builder /build/wheels /wheels
COPY --from=builder /build/requirements.txt .

# Install dependencies from wheels and remove build tools to eliminate CVEs and reduce attack surface
RUN pip install --no-cache /wheels/* \
    && pip uninstall -y pip setuptools wheel \
    && rm -rf /wheels

# Copy application code
COPY app/ ./app/

# Create a non-root user to run the application for minimal privilege
RUN useradd -m -U appuser && chown -R appuser:appuser /app
USER appuser

EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
