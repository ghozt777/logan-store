FROM node:18-alpine3.14

COPY . .

RUN npm install yarn 

RUN yarn build

RUN yarn install

EXPOSE 5001

CMD ["yarn", "start:prod"]
