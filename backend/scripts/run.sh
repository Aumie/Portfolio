#!/bin/sh

# if the next script fail, all fail
set -e

python manage.py wait_for_db
# put all static files in configured directory
python manage.py collectstatic --noinput
python manage.py migrate

#run on port 9000, nginx use for conenct to app
# app.wsgi -- from wsgi.py in app module
uwsgi --socket :9000 --workers 4 --master --enable-threads --module app.wsgi
