from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import RegisterForm
from user.forms import LoginForm
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError

def login(request):

    form = LoginForm(request.POST or None)
    valueButton = "Se connecter"
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