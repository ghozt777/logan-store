FROM node:18-alpine3.14

COPY . .

RUN npm install --force yarn 

RUN yarn install

EXPOSE 3000

CMD ["yarn", "start"]
