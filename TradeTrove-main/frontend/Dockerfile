FROM node:14.16.0-alpine as builder

WORKDIR /client

COPY ./package.json ./

RUN npm i

COPY . .

CMD ["npm", "run", "dev"]

# FROM nginx

# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /client/dist /usr/share/nginx/html

# EXPOSE 3000