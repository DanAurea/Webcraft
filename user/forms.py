from django import forms

class LoginForm(forms.Form):
	account = forms.CharField(label="", help_text="", max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
	password = forms.CharField(label="", help_text="", widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))

MODEL_CHOICES = (
    ('bear', 'Bear'),
    ('beaver', 'Beaver'),
    ('boar', 'Boar'),
    ('cat', 'Cat'),
    ('cow', 'Cow'),
    ('dog', 'Dog'),
    ('doge', 'Doge'),
    ('elephant', 'Elephant'),
    ('fox', 'Fox'),
    ('half', 'Half'),
    ('mammoth', 'Mammoth'),
    ('panda', 'Panda'),
    ('penguin', 'Penguin'),
    ('perry', 'Perry'),
    ('pig', 'Pig'),
    ('polar bear', 'Polar bear'),
    ('racoon', 'Racoon'),
    ('satan cow', 'Satan cow'),
    ('satan sheep', 'Satan sheep'),
    ('sheep', 'Sheep'),
    ('tiger', 'Tiger'),
    ('white tiger', 'White tiger'),
    ('winter fox', 'Winter fox'),
)

class RegisterForm(forms.Form):
	account    = forms.CharField(required = True, label="", help_text="", max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Username'}))
	password   = forms.CharField(required = True, label="", help_text="", widget=forms.PasswordInput(attrs={'placeholder': 'Password'}))
	avatarName = forms.CharField(required = True, label="", help_text="", max_length=100, widget=forms.TextInput(attrs={'placeholder': 'Avatar name'}))
	email      = forms.EmailField(required = True, label="", help_text="", widget=forms.TextInput(attrs={'placeholder': 'Email'}))
	model      = forms.ChoiceField(required= True, choices=MODEL_CHOICES)