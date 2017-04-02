from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import RegisterForm
from user.forms import LoginForm
from django.contrib.auth import authenticate, login as auth_login, logout
from django.contrib.sessions.models import Session
from django.contrib.auth.models import Permission
from django.db import IntegrityError
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from django.core.mail import send_mail
from game.models import *
from chat.models import *
from django.views.decorators.csrf import csrf_exempt

# Currently bypass csrf security (cause is gunicorn / nginx not passing correct args)
@csrf_exempt
def login(request):

    form        = LoginForm(request.POST or None)
    valueButton = "Se connecter"
    error       = None
    link = "<a id=\"link\" href=\"register\">Inscrivez-vous</a>"

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        
        ## Check if data fits with database
        user = authenticate(username=account, password=password)
        
        if user is not None:
            [s.delete() for s in Session.objects.all() if s.get_decoded().get('_auth_user_id') == user.id]
            auth_login(request, user)
            return redirect(reverse("game:home"), permanent = True)
            ## Check if user wasn't banned by an all mighty admin / moderator
            ## Not working at moment, should be fixed later
        	# if user_can_authenticate():
        	# 	login(request, user)
        	# else:
        	# 	error="L'utilisateur est banni"
        else:
        	error="L'utilisateur n'existe pas"
        	

    return render(request, 'user/baseForm.html', locals())

# Currently bypass csrf security (cause is gunicorn / nginx not passing correct args)
@csrf_exempt
def register(request):
    form        = RegisterForm(request.POST or None)
    valueButton = "S'inscrire"
    link = "<a id=\"link\" href=\"login\">Connectez-vous</a>"

    error       = None
    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        email = form.cleaned_data['email']
        avatarName = form.cleaned_data['avatarName']
        model = form.cleaned_data['model']

        #verifier si utilisateur n'existe pas déjà dans la bdd
        try:
            newUser         = User.objects.create_user(account, email, password)    
            newPlayer       = Player.objects.create(user = newUser, position="50,50,50", role=Role.objects.get(name="user"))
            newAvatar       = Avatar.objects.create(name=model)
            newAvatarPlayer =AvatarPlayer.objects.create(avatar_id = newAvatar, player_id = newPlayer, avatar_name  = avatarName)
            return redirect(reverse("user:login"), permanent = True)
        except IntegrityError:
            error="L'utilisateur existe déjà"
    
    return render(request, 'user/baseForm.html', locals())

def logout_view(request):
    logout(request)
    return redirect(reverse(login))