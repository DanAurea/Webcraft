from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect
from user.forms import ConnexionForm
from django.contrib.auth import authenticate, login

def connexion(request):

    form = ConnexionForm(request.POST or None)

    if form.is_valid():
        account = form.cleaned_data['account']
        password = form.cleaned_data['password']
        print(account, password)
    


    return render(request, 'user/connexion.html', locals())