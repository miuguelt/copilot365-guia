FROM nginx:1.27-alpine

RUN apk add --no-cache curl
RUN rm -rf /usr/share/nginx/html/*

COPY *.html devbrain-prose.css devbrain-prose.js /usr/share/nginx/html/
COPY src/ /usr/share/nginx/html/src/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -fsS http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
