from django import forms

class ChatForm(forms.Form):
	message = forms.CharField(label="" , max_length = 255)