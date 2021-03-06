FROM node:6.11.2

ENV HOME=/home/app

COPY package.json $HOME/sensors-management/

WORKDIR $HOME/sensors-management
RUN npm install --progress=false

COPY . $HOME/sensors-management

CMD ["npm", "start"]
