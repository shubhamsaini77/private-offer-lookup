FROM node
RUN apt update
RUN apt-get install -y zip awscli
WORKDIR /app
COPY ./ ./
WORKDIR /app/webapp/assembly
