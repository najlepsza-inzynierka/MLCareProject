FROM node

MAINTAINER Natalia Organek

#Creating working folder
RUN mkdir -p /usr/src/app -p /usr/src/node_modules
ENV NODE_PATH=/usr/src/node_modules

WORKDIR /usr/src/app
COPY . .
#RUN ls -la .
RUN npm install -g npm@latest
RUN rm -rf node_modules
RUN npm install
RUN npm audit fix
EXPOSE 4200
CMD ["npm", "start"]
