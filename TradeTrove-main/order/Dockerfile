FROM node:14.16.0-alpine

WORKDIR /order

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./order.js"]