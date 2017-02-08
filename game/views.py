from django.http import HttpResponse, Http404
from django.shortcuts import render, redirect


def home(request):
    text='Test vue'
    return HttpResponse(text)
