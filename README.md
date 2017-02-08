#Installation

You need to execute install.sh in sudo mode to retrieve external libraries and dependencies required for this project then
set your proper virtualenv using python 3.5.

> sudo install.sh

> virtualenv myEnv -p /usr/bin/python3.5

#Launching

You need to use python 3.5 for running correctly django-rpg so use your previously created virtualenv to proceed then

>source myEnv/bin/activate && python manage.py runserver
