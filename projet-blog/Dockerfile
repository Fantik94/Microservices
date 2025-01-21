FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8001
ENV ENV_FILE_LOCATION=/app/.env 