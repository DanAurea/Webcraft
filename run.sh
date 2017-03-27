killall python
killall daphne
daphne -b 0.0.0.0 -p 8000 trisdanvalwen.asgi:channel_layer&
python manage.py startServer --size=6 --time=6000
python manage.py runworker --only-channels=http.* --only-channels=websocket.* &