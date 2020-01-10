FROM repo.ms.gov.br/sgi/devops/node:10.15.3-lts-alpine3.9

WORKDIR /usr/src/app

RUN mkdir -p source && chown -R node:node source

COPY source ./source

COPY package*.json ./

COPY swagger.json ./

COPY index.js ./

RUN npm install

ENV AMBIENTE=hom

USER node

EXPOSE 5000

CMD [ "npm", "run", "api-elastic"]