FROM node:18-alpine3.14

COPY package*.json ./

COPY . .

RUN npm install yarn 

RUN yarn build

EXPOSE 5001

CMD ["node", "dist/main"]