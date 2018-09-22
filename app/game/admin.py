from django.contrib import admin
from .models import *
# Register your models here.

class AvatarPlayerAdmin(admin.TabularInline):
	model = AvatarPlayer
	readonly_fields=('avatar_id',)
	def has_add_permission(self, request):
    		return False

class PlayerAdmin(admin.ModelAdmin):
	model = Player
	readonly_fields=('user',)
	fields = ('user', 'position', 'map', 'role')
	inlines = [AvatarPlayerAdmin,]

admin.site.register(Player, PlayerAdmin)
