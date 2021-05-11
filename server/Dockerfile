FROM node:10.16-alpine as dev

RUN apk --no-cache add --virtual builds-deps build-base python

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --only=production

# Copy app source code
COPY . /usr/src/app

# Exports
EXPOSE 8000

CMD ["npm","start"]