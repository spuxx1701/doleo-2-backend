# Adjust node version if needed
FROM node:16 as build

WORKDIR /usr/app/
COPY ./ ./

RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/app/dist /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "daemon off;"]