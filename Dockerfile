# Use an official Node.js runtime as a base image
FROM node:20

# Install utilities
RUN apt-get -yqq update && \
  apt-get -yqq install curl gnupg libglib2.0-0 libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libpango1.0-0 libasound2 && \
  useradd -ms /bin/bash runner

RUN apt-get -yqq install default-jre
RUN java -version

RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    xvfb \
    libxi6 \
    libgconf-2-4 \
    firefox-esr \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
ADD . /app

COPY . /app

RUN npm install -g allure-commandline --save-dev

# Install http-server globally to serve your website
RUN npm install -g http-server


RUN npm install

# Expose port 80 for the web server
EXPOSE 80

# Command to start a simple server and run tests
CMD ["sh", "-c", "http-server /app/website -p 80 & SERVER_PID=$! && npm run test -- --Env=local --browser=chrome"]
