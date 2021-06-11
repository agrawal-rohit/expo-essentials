FROM node:10.16-alpine

RUN apk --no-cache add --virtual builds-deps build-base python
RUN apk add --no-cache bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

# Install Dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install

# Copy app source code
COPY . .

# Exports
EXPOSE 8000

# Run npm start script with PM2 when container starts
CMD [ "pm2-runtime", "npm", "--name=nawvel", "--", "run", "start:prod"]