from django.db import models

## Define permission relation.
class ChatPermission(models.Model):
	permission_id = models.AutoField(primary_key = True)
	name          = models.CharField(max_length = 80, default=None)

	def __str__(self):
		return "ID = " + self.permission_id + ", name = " + self.name

## Define group relation.
class Role(models.Model):
	role_id  = models.AutoField(primary_key = True)
	name     = models.CharField(max_length = 80, default="user")
	strength = models.IntegerField(default=1)

	def __str__(self):
		return "Name = " + self.name + ", strength = " + str(self.strength)

## Define permissions for each role
class RolePermission(models.Model):
	role       = models.ForeignKey(Role)
	permission = models.ForeignKey(ChatPermission)

	def __str__(self):
		return "Rolename = " + self.role.name + ", permission = " + self.permission.name