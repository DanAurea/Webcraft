"""
WSGI config for trisdanvalwen project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/howto/deployment/wsgi/
"""

import os
import atexit
import game.runtime as Runtime

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "trisdanvalwen.settings")

application = get_wsgi_application()

## Save map before exiting
atexit.register(Runtime.saveInFile)