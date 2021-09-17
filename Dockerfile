FROM node:erbium

RUN npm install nodemon -g

WORKDIR /src

ADD package.json package.json
RUN npm install