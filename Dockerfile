FROM node:6

ENV HOME=/home/app

COPY package.json $HOME/sensors-management/

WORKDIR $HOME/sensors-management
RUN npm cache clean && npm install --progress=false

COPY . $HOME/sensors-management

CMD ["npm", "start"]
