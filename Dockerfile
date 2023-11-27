
FROM node:20 AS build

WORKDIR /app

ENV HUGO_VERSION="0.120.4"

RUN set -ex \
  && curl -fsSLO --compressed "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" \
  && curl -fsSLO --compressed "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_${HUGO_VERSION}_checksums.txt" \
  && grep " hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz\$" hugo_${HUGO_VERSION}_checksums.txt | sha256sum -c - \
  && tar -xzf hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz -C /usr/local/bin/ \
  && rm hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz \
  && rm hugo_${HUGO_VERSION}_checksums.txt \
  && hugo version

COPY . /app

RUN yarn install --frozen-lockfile

RUN hugo --minify --enableGitInfo

FROM alpine:3.10

WORKDIR /usr/share/nginx/html/

COPY --from=build /app /usr/share/nginx/html

RUN ls -al /usr/share/nginx/html
