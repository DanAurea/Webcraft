from hashlib import md5
from django.contrib.auth.models import User
from communication.ComAPI.packetChat import PacketChat
from django.http import JsonResponse
from game.mapGenerator import MapGenerator


## Tick state
timeDay 	= 0
## Duration day based on tickstate (10 min here => 10 * 60 * 20 ticks/s)
durationDay = 12000

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

	global timeDay
	global durationDay

	data = {"timeDay": timeDay,
			"durationDay": durationDay,
			"size": 2,
			"seedColor": 53482}
	return JsonResponse(data)

def getChunk(request):
	"""Ajax request sending chunk status"""
	
	data = {}
	return JsonResponse(data)