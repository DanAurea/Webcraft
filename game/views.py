from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from chat.forms import ChatForm
from django.contrib.sessions.models import Session
from game.utils import getToken

def home(request):
	
	if(request.user.is_authenticated()):
		
		## Generate an user token based on username
		token = '"%s"'%getToken(request.user.username).hex()
		username ='"%s"'%request.user.username

		form = ChatForm(request.POST or None)

		if form.is_valid():
			message = form.cleaned_data['message']

		return render(request, 'game/home.html', locals())
	else:
		return redirect("user:login")