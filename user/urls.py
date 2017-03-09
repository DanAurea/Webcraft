from . import views
from django.conf.urls import url,include
from django.contrib import admin

urlpatterns = [
    url(r'^login$', views.login),
    url(r'^register$', views.register),
]