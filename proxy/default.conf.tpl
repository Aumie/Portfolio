#upstream api {
#   server django-api:8000;
#}
server {
    listen 80;
    server_name aumidev.me;
    server_tokens off;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
#    listen ${LISTEN_PORT};
    listen 443 ssl;
    server_name aumidev.me;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/aumidev.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/aumidev.me/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    client_max_body_size 20M;

    location / {
      root /var/www/react;
      index  index.html index.htm;
      try_files $uri $uri/ /index.html;
    }

    location /api {
        try_files $uri @proxy_api;
    }
    location /admin {
        try_files $uri @proxy_api;
    }
    location /swagger {
        try_files $uri @proxy_api;
    }

    location @proxy_api {
      proxy_set_header X-Forwarded-Proto https;
      proxy_set_header X-Url-Scheme $scheme;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $http_host;
      proxy_redirect off;
#      proxy_pass   http://django-api:8000;
      uwsgi_pass              ${APP_HOST}:${APP_PORT};
      include                 /etc/nginx/uwsgi_params;
    }
    # any url start with /static will go to /vol/static
    location /static {
       autoindex on;
       alias /vol/static;
    }

#    location /api/ {
#       proxy_pass              http://api;
#       proxy_set_header        Host $http_host;
#       uwsgi_pass              ${APP_HOST}:${APP_PORT};
       # uwsgi_params required for http request to be process in uwsgi --- a list of params that will pass from http request to running services
#       include                 /etc/nginx/uwsgi_params;
       # maximum of body size that request can pass-- 10Megabyte
#       client_max_body_size    10M;
#    }
}