FROM node:14.17.6-alpine3.13 as build
WORKDIR /app
COPY . /app/
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install --silent
RUN npm run build
#prepare nginx
FROM nginx:1.21.5-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

#fire up nginx
EXPOSE 80
CMD ["nginx","-g", "daemon off;"]