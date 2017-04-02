killall python
killall daphne
killall gunicorn
python manage.py startServer --size=6  --time=6000
## Only use without gunicorn (debug purpose)
# python manage.py runworker --only-channels=http.* --only-channels=websocket.* &
gunicorn  -b 0.0.0.0:8000 trisdanvalwen.wsgi --timeout 200&
daphne -b 0.0.0.0 -p 8001 trisdanvalwen.asgi:channel_layer&
python manage.py runworker --only-channels=websocket.* &
