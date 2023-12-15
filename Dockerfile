FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV VITE_APU_URL ${VITE_APU_URL}

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "preview"]