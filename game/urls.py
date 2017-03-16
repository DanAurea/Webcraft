from django.conf.urls import url
from . import views, utils

urlpatterns = [

    url(r'^home$', views.home, name='home'),
    url(r'^getInfoMap/$', utils.getInfoMap, name='getInfoMap'),
    url(r'^getChunk/$', utils.getChunk, name='getChunk'),
]
