from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import LoginForm
from django.contrib.auth import authenticate, login

def login(request):

    form = LoginForm(request.POST or None)

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        print(account, password)
    


    return render(request, 'user/login.html', locals())