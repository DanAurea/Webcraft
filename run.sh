#!/bin/bash

## This script was created for running in a docker container 

if pgrep -x "daphne" > /dev/null
then
	echo "Daphne was already running, trying to kill all instances..."
    pkill daphne
    echo "Done !"

fi

if pgrep -x "python" > /dev/null
then
	echo "Python was already running, trying to kill all instances..."
    pkill python
    echo "Done !"
fi

if pgrep -x "gunicorn" > /dev/null
then
	echo "Gunicorn was already running, trying to kill all instances..."
    pkill gunicorn
    echo "Done !"
fi

## Retrieve how many cpu are available
nbCpu="$(grep -c ^processor /proc/cpuinfo)"    
nbWorkers="$(($nbCpu * 2 + 1))"

## Launch server using game's runtime
python manage.py startServer --size=10 --generate
daphne -b 0.0.0.0 -p 8001 trisdanvalwen.asgi:channel_layer&

## Launch websocket workers
for (( i=0; i< $nbWorkers; i++ ))
do
	python manage.py runworker --only-channels=websocket.* &
done

gunicorn trisdanvalwen.wsgi -c ./conf/gunicorn.py 