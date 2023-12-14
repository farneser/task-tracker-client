FROM node:18-alpine as build

RUN npm install -g yarn

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "preview"]