FROM node:9-alpine

MAINTAINER mrcode "mrcodehang@outlook.com"

WORKDIR /src

COPY . /src

RUN npm install -g yarn && yarn install

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
