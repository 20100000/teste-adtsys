FROM node:alpine
# application placed into /opt/app
RUN mkdir -p /opt/app
RUN npm install -g jasmine

WORKDIR /opt/app

ENV PASSWORD_WEATHER 611ad7b47e3d9c595bc9a7713dfd20be
ENV EMAIL_ADDRESS tiago_honorio2010@hotmail.com
ENV DEV_NAME Tiago Honorio

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install --production && npm cache clean --force

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]
