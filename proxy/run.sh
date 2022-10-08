#!/bin/sh

set -e

# environment substitute? substitute all of ${}syntex in conf.tpl on runtime
# $$ for escape from docker variable, so it doesnt confuse in conf
envsubst '$$LISTEN_PORT $$APP_HOST $$APP_PORT' < /etc/nginx/default.conf.tpl > /etc/nginx/conf.d/default.conf
# want to run nginx in foreground
# usaully it runs in background
# all of the logs get output through screen
nginx -g 'daemon off;'