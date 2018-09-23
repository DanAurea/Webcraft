# webcraft

Demo at: http://tales4craft.fr/DRPG/game/home

webcraft is a MMORPG made with Django framework, Channels (websocket) and Javascript for client rendering.
It's a minecraft like game with cute pets, we made all models with Magicavoxel to save time, you can chat with everyone and
build creative constructions by your own hands.

It's a school project made during last year of bachelor's computer science from "Université du Maine" in France for "Web architecture" class.

It's still in development so be free to signal any issues with demo on github.


![screengit](https://cloud.githubusercontent.com/assets/15633085/24589764/66176b4a-17e0-11e7-8d2b-a723c2accf7a.png)
![maison](https://cloud.githubusercontent.com/assets/15633085/24629799/a071c7ba-18ba-11e7-9073-06a30a203574.png)
![maison-int](https://cloud.githubusercontent.com/assets/15633085/24629816/b2213950-18ba-11e7-8f05-e84e1e67c9cd.png)

## How it works

webcraft make use of Channels for real time part, websocket are used for chatting app and game app currently, we should
update this projet to use WebRTC (UDP packets) as a layer for any packets sent or received by game (excepting chat).

Gunicorn is used as WSGI server because of its lower latency for http requests compared to daphne ASGI server
Daphne is default ASGI server used by channels to handle any websocket request.
Django-redis-cache is used as session backend cache and as application cache for sharing map informations through each worker
and save recurrent changes on map's chunks.

Nginx is used as proxy-server to redirect requests on correct services and for serving static files furthermore it's enable gzip compression and cache for request.

And PostgreSQL is DBMS chosen for this project for low latency and high throughput.

Demo is running on a server using Docker containers for each service (nginx, postgresql, redis etc...).

## Installation

This repo make uses of postgreSQL and redis-server so be sure to have them installed on your machine.

Once you have them installed use pip to install any requirements:

> pip install -r requirements.txt

Before starting, set a new database for running this project then make necessary changes in webcraft/settings.py file.

Do migrations to create table structure with following command:

> python manage.py migrate

Once you have set up your new installation, you can load some fixtures for testing purpose:

> python manage.py loaddata user/fixtures/user_data.json
>
> python manage.py loaddata user/fixtures/initial_data.json
>
> python manage.py loaddata game/fixtures/initial_data.json

## Running

Once you have all requirements you can run server executing:
>$ ./run.sh

in root's project directory, it's a tiny shell script that run daphne, initialize runtime server and run workers using gunicorn.
