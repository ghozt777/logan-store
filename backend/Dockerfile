FROM node:18-alpine3.14

COPY . .

RUN npm install yarn 

RUN yarn install

RUN yarn build

CMD ["yarn", "start:prod"]