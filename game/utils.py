from hashlib import md5
from django.contrib.auth.models import User
from communication.ComAPI.packetChat import PacketChat
from django.http import JsonResponse
from django.core.cache import cache
import game.runtime as Runtime
from game.server.world.world import World


def getToken(username):
	""" Generate a new token
		based on username
		hashed password
		secretKey
	"""

	## Initliaze packet chat manager class
	packet = PacketChat()

	token        = username
	hashPassword = User.objects.get(username=username).password
	token        += hashPassword
	token        += packet.secretKey

	hashedToken = md5(token.encode())

	return hashedToken.digest()

def getInfoMap(request):
	"""Ajax request sending informations about map and status infos
		size map
		time day
		duration day
		seed color
	"""

	data = {"timeDay": Runtime.timeDay,
			"durationDay": Runtime.durationDay,
			"size": Runtime.size,
			"seedColor": Runtime.seed}
	return JsonResponse(data)


def getChunk(request):
	"""Ajax request sending chunk status"""
	x = int(request.GET.get("x", None))
	z = int(request.GET.get("z", None))

	## Get chunk from subdivision stored
	## in redis.
	tiles           = Runtime.reassemble(x, z)
	compressedChunk = Runtime.compressChunk(tiles)

	## TODO: Exception if bad request
	data = {"tiles" : compressedChunk,
			"x" : x,
			"z": z}
	return JsonResponse(data)
