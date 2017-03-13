from . import views
from django.contrib import admin
from django.conf.urls import url,include

urlpatterns = [
    url(r'^login$', views.login, name="login"),
    url(r'^logout$', views.logout, name="logout"),
    url(r'^register$', views.register, name="register"),
]