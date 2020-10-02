FROM python:3.7

MAINTAINER Natalia Organek

ENV PYTHONUNBUFFERED 1

RUN mkdir -p /usr/src/app

# Update working directory
WORKDIR /usr/src/app

# copy everything from this directory to server/flask docker container
COPY . /usr/src/app/

RUN pip install --upgrade pip
# Install the Python libraries
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

# run server
CMD ["python3", "setup.py"]