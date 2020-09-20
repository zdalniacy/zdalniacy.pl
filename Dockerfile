FROM node:0.11

RUN mkdir /app

COPY . /app
WORKDIR /app
RUN npm install

CMD ["node", "index.js"]