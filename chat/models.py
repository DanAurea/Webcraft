from django.db import models
from game.models import Player

class ChatMessage(models.Model):
	message_id = models.AutoField(primary_key=True)
	player_id  = models.ForeignKey(Player)
	message    = models.CharField(max_length = 65535, default = "")
	timestamp  = models.BigIntegerField(default = 0)

	def __str__(self):
		return "Message = " + self.message