FROM python:3.12.3
WORKDIR /app
COPY . /app
ENV PYTHONPATH="/app:${PYTHONPATH}"
RUN pip install --no-cache-dir -r requirements.txt
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]