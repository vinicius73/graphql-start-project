FROM node:10.15-alpine

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm config set unsafe-perm true \
    && npm install --quiet node-gyp -g
