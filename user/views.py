from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import RegisterForm
from user.forms import LoginForm
from django.contrib.auth import authenticate, login as auth_login, logout 
from django.contrib.auth.models import Permission
from django.db import IntegrityError
from django.core.urlresolvers import reverse

def login(request):

    form        = LoginForm(request.POST or None)
    valueButton = "Se connecter"
    error       = None

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        ## Check if data fits with database
        user = authenticate(username=account, password=password)
        if user is not None:
            auth_login(request, user)
            ## Check if user wasn't banned by an all mighty admin / moderator
            ## Not working at moment, should be fixed later
        	# if user_can_authenticate():
        	# 	login(request, user)
        	# else:
        	# 	error="L'utilisateur est banni"
        else:
        	error="L'utilisateur n'existe pas"
        	registerLink = "<a href=\"register\" >Inscrivez-vous</a>"

    return render(request, 'user/baseForm.html', locals())

def register(request):

    form = RegisterForm(request.POST or None)
    valueButton = "S'inscrire"
    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        email = form.cleaned_data['email']

        #verifier si utilisateur n'existe pas déjà dans la bdd
        try:
            new_user = User.objects.create_user(username, email, password)
        except IntegrityError:
            print("utilisateur déjà existant")
        else:
            print("utilisateur créé")

        print(account, password, email)
    
    return render(request, 'user/baseForm.html', locals())

def logout_view(request):
    logout(request)
    return redirect(reverse(login))