from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import RegisterForm
from user.forms import LoginForm
from django.contrib.auth import authenticate, login, logout

def login(request):

    form = LoginForm(request.POST or None)

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        print(account, password)
        # user = authenticate(account=account, password=password)
        if user is not None:
        	if user_can_authenticate(user):
        		login(request, user)
        	else:
        		print ("L'utilisateur est banni")
        else:
        	print ("L'utilisateur n'existe pas")
    


    return render(request, 'user/login.html', locals())


def register(request):

    form = RegisterForm(request.POST or None)

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        email = form.cleaned_data['email']
        print(account, password, email)
    
    return render(request, 'user/register.html', locals())



def logout_view(request):
    logout(request)