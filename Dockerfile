# Start with a Python image.
FROM python:3.6

ARG SERVER_DOMAIN

# Some stuff that everyone has been copy-pasting
# since the dawn of time.
ENV PYTHONUNBUFFERED 1
ENV SERVER_DOMAIN "$SERVER_DOMAIN"

# Install some necessary things.
RUN apt-get update && apt-get install -y --no-install-recommends libpq-dev python-dev python-psycopg2 \
	&& rm -rf /var/lib/apt/lists/* && pip install --upgrade pip

RUN mkdir /app
ADD ./app /app
WORKDIR /app

# Install our requirements.
RUN pip install -r requirements.txt

# Specify the command to run when the image is run.
CMD ["/bin/bash"]
#CMD ["/app/run.sh"]