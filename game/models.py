from django.db import models

## Define player relation for storing 
## player relative informations.
class Player(models.Model):
	id_player = models.AutoField(primary_key=True)
	login     = models.CharField(max_length = 50, unique = True)
	password  = models.CharField(max_length = 50)

	def __str__(self):
		return self.login

## Define avatar relation for storing
## avatar relative informations.
class Avatar(models.Model):
	id_avatar   = models.AutoField(primary_key=True)
	id_player   = models.ForeignKey('Player', on_delete = models.CASCADE,)
	avatar_name = models.CharField(max_length = 50)
	sex         = models.IntegerField()

	def __str__(self):
		return self.avatar_name

## Define avatar styles relation for storing
## avatar styles relative informations.
class AvatarStyle(models.Model):
	id_style   = models.AutoField(primary_key = True)
	id_avatar  = models.ForeignKey('Avatar', on_delete = models.CASCADE,)
	hair       = models.IntegerField()
	hair_color = models.IntegerField()
	eyes       = models.IntegerField()
	skin_color = models.IntegerField()

	def __str__(self):
		return self.id_avatar