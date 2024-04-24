FROM node:14.16.0-alpine

WORKDIR /items

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./items.js"]