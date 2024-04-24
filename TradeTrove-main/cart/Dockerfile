FROM node:14.16.0-alpine

WORKDIR /cart

COPY ./package.json ./

RUN yarn

COPY . .

CMD ["node", "./cart.js"]