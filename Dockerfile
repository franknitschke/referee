FROM node:18.18.2-alpine

USER node

WORKDIR /home/app/server

ADD --chown=node:node server/package.json .
ADD --chown=node:node server/package-lock.json .

RUN npm install

WORKDIR /home/app

ADD  --chown=node:node . /home/app/

# Change Workdir to Server
WORKDIR /home/app/server

CMD [ "node", "app.js" ]