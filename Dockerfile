FROM node:18-alpine as builder

WORKDIR /app

COPY .  .

RUN yarn install --frozen-lockfile

RUN yarn build

FROM nginx:1.23.0-alpine as production

WORKDIR /usr/share/nginx/html

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./env.sh .

COPY ./.env .

RUN chmod +x env.sh

EXPOSE 80

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]