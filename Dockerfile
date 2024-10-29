FROM node:22.10.0-slim

RUN apt-get update -y && apt-get install -y openssl

COPY . /app
WORKDIR /app