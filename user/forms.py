from django import forms

class LoginForm(forms.Form):
	account = forms.CharField(label="", help_text="", max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
	password = forms.CharField(label="", help_text="", widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))



class RegisterForm(forms.Form):
	account = forms.CharField(required = True, label="", help_text="", max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
	password = forms.CharField(required = True, label="", help_text="", widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
	email = forms.EmailField(required = True, label="", help_text="", widget=forms.TextInput(attrs={'placeholder': 'Email'}))
