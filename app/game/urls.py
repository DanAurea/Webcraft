from django.conf.urls import url
from . import views, utils

app_name="game"

urlpatterns = [

    url(r'^home$', views.home, name='home'),
    url(r'^getInfoMap/$', utils.getInfoMap, name='getInfoMap'),
    url(r'^getWorld/$', utils.getWorld, name='getWorld'),
]