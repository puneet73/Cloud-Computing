FROM node:14.16.0-alpine

FROM node:14.16.0-alpine

WORKDIR /authenticate

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./authenticate.js"]