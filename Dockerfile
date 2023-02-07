FROM surnet/alpine-wkhtmltopdf:3.16.2-0.12.6-full as wkhtmltopdf

FROM node:alpine as node

# ttf-dejavu ttf-droid ttf-freefont ttf-liberation ttf-ubuntu-font-family
# Install wkhtmltopdf
# persistent / runtime deps
# persistent / runtime deps
# wkhtmltopdf install dependencies
RUN apk add --no-cache \
    libstdc++ \
    libx11 \
    libxrender \
    libxext \
    libssl1.1 \
    ca-certificates \
    fontconfig \
    freetype \
    ttf-droid \
    ttf-freefont \
    ttf-liberation \
    # more fonts
    ;
# wkhtmltopdf copy bins from ext image
COPY --from=wkhtmltopdf /bin/wkhtmltopdf /bin/libwkhtmltox.so /bin/

RUN echo  wkhtmltopdf --version
WORKDIR /app

COPY package.json package-lock.json  ./

RUN echo node -v

RUN npm install

COPY . .

CMD  [ "npm", "start" ]
