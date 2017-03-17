from user.models import *
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import validate_comma_separated_integer_list

## Define player relation for storing 
## player relative informations.
class Player(models.Model):
	id_player = models.AutoField(primary_key=True)
	user      = models.OneToOneField(User)
	position  = models.CharField(max_length = 10,validators=[validate_comma_separated_integer_list], default = "0,0,0")
	map       = models.IntegerField(default=1)
	role      = models.ForeignKey(Role)

	def __str__(self):
		return "Username = " + self.user.username + ", role = " + self.role.name

## Define avatar's player relation for storing
## avatar relative informations.
class AvatarPlayer(models.Model):

	## Define avatar_id and player_id as composite primary key
	class Meta:
		unique_together = (('avatar_id', 'player_id'),)

	avatar_id   = models.ForeignKey('Avatar', on_delete = models.CASCADE,)
	player_id   = models.ForeignKey('Player', on_delete = models.CASCADE,)
	avatar_name = models.CharField(max_length = 80, default=None)

	def __str__(self):
		return "Avatar name = " + self.avatar_name

## Define avatar relation for storing
## avatar relative informations.
class Avatar(models.Model):
	avatar_id   = models.AutoField(primary_key = True)
	name 		= models.CharField(max_length = 80, default="pig")

	def __str__(self):
		return "Avatar name = " + self.name