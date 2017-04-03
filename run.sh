#!/bin/bash

python manage.py startServer --size=10 --generate
daphne -b 0.0.0.0 -p 8001 trisdanvalwen.asgi:channel_layer&
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
python manage.py runworker --only-channels=websocket.* &
gunicorn  -b 0.0.0.0:8000 trisdanvalwen.wsgi --timeout 200 --workers=9
