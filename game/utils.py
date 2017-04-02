from hashlib import md5
from django.contrib.auth.models import User
from communication.ComAPI.packetChat import PacketChat
from django.http import JsonResponse
from game.mapGenerator import MapGenerator
from django.core.cache import cache
import game.runtime as Runtime
import game.mapGenerator as MapInfo

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
			"seedColor": MapGenerator.seedColor}
	return JsonResponse(data)

def reassemble(x, z): 
	"""	Reassemble a dispatched chunk from redis"""

	nbDivisions = int(MapInfo.nbTilesByChunk / Runtime.sizeChunk)
	
	chunk = []	

	for i in range(0, nbDivisions):
		key      = "".join(["map_", str(x), "_", str(z), "_", str(i)])
		division = cache.get(key)
		chunk.append(division)

	chunk = [item for sublist in chunk for item in sublist]

	return chunk

def getChunk(request):
	"""Ajax request sending chunk status"""
	x = int(request.GET.get("x", None))
	z = int(request.GET.get("z", None))

	## Get chunk from subdivision stored 
	## in redis.
	chunk           = reassemble(x, z)
	compressedChunk = MapInfo._compress(chunk)

	## TODO: Exception if bad request
	data = {"tiles" : compressedChunk,
			"x" : x,
			"z": z}
	return JsonResponse(data)