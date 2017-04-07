from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from communication.ComAPI.packet import Packet
from communication.ComAPI.packetChat import PacketChat
from communication.ComAPI.packetPlaceTile import PacketPlaceTile
from communication.ComAPI.packetLogin import PacketLogin
from communication.ComAPI.packetLogout import PacketLogout
from communication.ComAPI.packetMove import PacketMove
from django.core.cache import cache
from game.utils import getToken
from game.mapGenerator import Chunk
from game.models import *
from chat.models import ChatMessage
from django.utils.html import strip_tags
import game.runtime as Runtime
import game.mapGenerator as MapInfo

## Initliaze packet managers class
packet = Packet()
packetChat = PacketChat()
packetMove = PacketMove()
packetLogin = PacketLogin()
packetLogout = PacketLogout()
packetPlaceTile = PacketPlaceTile()

MESSAGE_NUMBER = 10

# Consumer for chat connection using
# session for keeping token and
# using group for broadcast purpose
# 
# Copy http session from django into channel session
# for retrieving each session key of current user
# when communicating with server.
@channel_session_user_from_http
def ws_connect(message):
	message.reply_channel.send({
        'accept': True
	})

	Group('chat').add(message.reply_channel)
	Group('game').add(message.reply_channel)
	getLastChatMessage()



# Consumer for chat message received using
# session for keeping token and
# using group for broadcast purpose
# 
# Filter packets and handle them
@channel_session_user
def ws_receive(data):

	binaryData = data.content["bytes"]

	## Received binary datas from channel and check if trusted 
	## (+2 bytes because data size coded on 2 bytes + data are required )
	if(data.content["bytes"] and len(binaryData) >= packet.CLIENT_HEADER_SIZE):

		header = packet.decode(binaryData)
		
		## Check if it's a trusted user by checking token
		user    = data.user
		hashedToken = getToken(user.username)

		## Close websocket if untrusted connection detected
		if(hashedToken.hex() != packet.token):
			ws_close(data)

		## Packet chat
		if(packet.packetID == 1):
			message = packetChat.decode(binaryData)
			
			## Problem with decoding, not trusted datas sent
			if message == False:
				ws_close(data)

			message = strip_tags(message)
			chatHandler(message, user)
		## Packet place tile
		elif(packet.packetID == 2):
			loginHandler(data.reply_channel,user)
		elif(packet.packetID == 4):
			x, y, z, pitch, yaw, motionX, motionY, motionZ = packetMove.decode(binaryData)

			moveHandler(user=user, x=x, y=y, z=z, pitch=pitch, yaw=yaw, motionX=motionX, motionY=motionY, motionZ=motionZ)
		elif(packet.packetID == 5):
			tX, tY, tZ, tileID = packetPlaceTile.decode(binaryData)

			placeTileHandler(tX, tY, tZ, tileID)
		elif(packet.packetID == 6):
			pass


## Send a close message to client websocket
def ws_close(data):
	data.reply_channel.send({"close": True})
	
# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session_user
def ws_disconnect(message):

	username = message.user.username
	
	Group('game').send({
		'bytes': packetLogout.encode(username=username)
	})
	
	Group('chat').discard(message.reply_channel)
	Group('game').discard(message.reply_channel)

## Handler for chat packet
## Data persistance enabled
def chatHandler(message, user):

	player = Player.objects.get(id_player= user.player.id_player)

	Group('chat').send({
				'bytes': packetChat.encode(message, user.username),
	})

	count = ChatMessage.objects.all().count()

	## Delete first entry from chat message table
	if(count == MESSAGE_NUMBER):
		ChatMessage.objects.all().order_by("timestamp")[0].delete()

	## Create one entry in database with new message, player id and timestamp
	ChatMessage.objects.create(player_id = player, message = message, timestamp = packetChat.timestamp)

## Retrieve last chat message from database
## with number limit set by argument.
def getLastChatMessage():
	## Retrieves n last messages
	queries = ChatMessage.objects.all().order_by("timestamp")

	## Send all retrieved messages on chat
	for query in queries:

		username       = query.player_id.user.username
		message        = query.message

		## Set manually timestamp with query timestamp
		packetChat.timestamp = query.timestamp

		Group('chat').send({
			'bytes': packetChat.encode(message, username, False),
		})

## Place a tile on every client at position specified by user
def placeTileHandler(tX, tY, tZ, tileID):

	cX, cZ = int(tX / MapInfo.chunkSize), int(tZ / MapInfo.chunkSize)
	posInChunkX = int(tX % 16)
	posInChunkZ = int(tZ % 16)

	indexSubdiv = int(Chunk.getIndex4Coords(posInChunkX, tY, posInChunkZ) / Runtime.sizeChunk)
	
	key = "".join(["map_", str(cX), "_", str(cZ), "_", str(indexSubdiv)])

	indexTile = int(Chunk.getIndex4Coords(posInChunkX, tY, posInChunkZ) % Runtime.sizeChunk)
	
	chunk = cache.get(key)
	chunk[indexTile] = tileID
	cache.set(key, chunk, timeout=None)

	Group('game').send({
			"bytes": packetPlaceTile.encode(tX, tY, tZ, tileID)
	})

## Broadcast login from user
def loginHandler(channel, user):

	users = cache.get_many(cache.keys("user_*"))

	for key in users:

		if(users[key] != user.username):
			tmp = User.objects.get(username=users[key])

			## Retrieve informations about avatar player
			avatarInfos = AvatarPlayer.objects.get(player_id=tmp.player.id_player)
			x, y , z = map(int, tmp.player.position.split(","))

			avatar = avatarInfos.avatar_id.name
	
			## Send users already connected to user who logged in 
			channel.send({
				'bytes': packetLogin.encode(tmp.username, avatar, [x,y,z])
			})

	## Send info about current logged user to all users connected
	avatarInfos = AvatarPlayer.objects.get(player_id=user.player.id_player)
	x, y , z = map(int, user.player.position.split(","))
	avatar = avatarInfos.avatar_id.name

	## Say
	Group('chat').send({
		'bytes': packetChat.encode(user.username + " s'est connecte", "Server")
	})	

	Group('game').send({
		'bytes': packetLogin.encode(user.username, avatar, [x,y,z])
	})
	
	## Set a new user in redis cache
	cache.set("user_" + user.username, user.username, timeout=None)

def moveHandler(**kwargs):

	user = kwargs.get("user", None)
	username = user.username
	
	x     = kwargs.get("x", None)
	y     = kwargs.get("y", None)
	z     = kwargs.get("z", None)
	
	pitch = kwargs.get("pitch", None)
	yaw   = kwargs.get("yaw", None)
	
	motionX = kwargs.get("motionX", None)
	motionY = kwargs.get("motionY", None)
	motionZ = kwargs.get("motionZ", None)


	Group('game').send({
		'bytes': packetMove.encode(username=username, x=x, y=y, z=z, pitch=pitch, yaw=yaw, motionX=motionX, motionY=motionY, motionZ=motionZ)
	})