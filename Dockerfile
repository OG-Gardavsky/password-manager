FROM node:16.16.0-alpine3.15
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT npm start
EXPOSE 4000