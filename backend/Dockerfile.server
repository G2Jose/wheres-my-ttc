FROM node:9.6.1-alpine
COPY ./package.json /packages/package.json
RUN cd /packages/ && yarn
WORKDIR /restbus_server
RUN cp -a /packages/* /restbus_server/
COPY . /restbus_server
EXPOSE 3000
CMD ["node", "server.js"]
