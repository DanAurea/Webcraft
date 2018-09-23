#!/bin/bash

/app/manage.py collectstatic -c --noinput
/app/manage.py makemigrations --no-input
/app/manage.py migrate --no-input
/app/manage.py loaddata /app/user/fixtures/user_data.json --exclude auth.Permission
/app/manage.py loaddata /app/user/fixtures/initial_data.json
/app/manage.py loaddata /app/game/fixtures/initial_data.json

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
daphne -b 0.0.0.0 -p 8001 webcraft.asgi:application&

## Launch websocket workers
for (( i=0; i< $nbWorkers; i++ ))
do
	python manage.py runworker channels websocket &
done

gunicorn webcraft.wsgi -c ./conf/gunicorn.py 