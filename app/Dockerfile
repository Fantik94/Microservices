# Start with the FastAPI base image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r Jour2/requirements.txt
EXPOSE 8001
#COPY .env /app
# Set environment variables from .env file
ENV ENV_FILE_LOCATION=/app/.env