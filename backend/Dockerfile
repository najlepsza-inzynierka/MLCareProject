FROM python:3.7

MAINTAINER Natalia Organek

ENV PYTHONUNBUFFERED 1
ENV FLASK_APP setup.py
ENV DB_USERNAME Dev
ENV DB_PASSWORD develop
ENV DB_HOSTNAME mediclaster-b8qof.mongodb.net/test?retryWrites=true&w=majority
ENV DB_NAME development
ENV SECRET_KEY="\xf8\x88\x8bC\x98\xfe\x1a\xe2\x8d\xe1p\x8b0\xea\xb6Z\xc6-\x9cI>\x10\xe2\x99"

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