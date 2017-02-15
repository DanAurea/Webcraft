from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from chat.forms import ChatForm

def home(request):
    form = ChatForm(request.POST or None)

    if form.is_valid():
    	message = form.cleaned_data['message']

    return render(request, 'game/home.html', locals())