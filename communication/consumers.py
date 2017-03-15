import logging

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from communication.ComAPI.packet import Packet
from communication.ComAPI.packetChat import PacketChat
from game.utils import getToken
from game.models import Player
from chat.models import ChatMessage

## Initliaze packet managers class
packet = Packet()
packetChat = PacketChat()

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
	if(data.content["bytes"] and len(binaryData) > packet.CLIENT_HEADER_SIZE + 2):

		header = packet.decode(binaryData)
		
		## Check if it's a trusted user by checking token
		user    = data.user
		hashedToken = getToken(user.username)

		## Close websocket if untrusted connection detected
		if(hashedToken.hex() != packet.token):
			ws_close(data)

		if(packet.packetID == 1):
			message = packetChat.decode(binaryData)
			
			## Problem with decoding, not trusted datas sent
			if message == False:
				ws_close(data)

			chatHandler(message, user)

## Send a close message to client websocket
def ws_close(data):
	data.reply_channel.send({"close": True})
	
# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	 Group('chat').discard(message.reply_channel)
	 Group('game').add(message.reply_channel)

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
		ChatMessage.objects.all()[:MESSAGE_NUMBER][0].delete()

	## Create one entry in database with new message, player id and timestamp
	ChatMessage.objects.create(player_id = player, message = message, timestamp = packetChat.timestamp)

## Retrieve last chat message from database
## with number limit set by argument.
def getLastChatMessage():
	## Retrieves n last messages
	queries = ChatMessage.objects.all()

	## Send all retrieved messages on chat
	for query in queries:

		username       = query.player_id.user.username
		message        = query.message

		## Set manually timestamp with query timestamp
		packetChat.timestamp = query.timestamp

		Group('chat').send({
			'bytes': packetChat.encode(message, username, False),
		})