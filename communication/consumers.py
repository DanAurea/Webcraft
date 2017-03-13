import logging

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from communication.ComAPI.packetChat import PacketChat
from game.utils import getToken
# from .models import ChatMessage

## Initliaze packet chat manager class
packet = PacketChat()

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

# Consumer for chat message received using
# session for keeping token and
# using group for broadcast purpose
# 
# Filter packets and handle them
@channel_session_user
def ws_receive(data):

	## Received binary datas from channel
	if(data.content["bytes"] and len(data.content["bytes"]) > packet.CLIENT_HEADER_SIZE ):

		message = packet.decode(data.content["bytes"])
		
		## Check if it's a trusted user by checking token
		username    = data.user.username
		hashedToken = getToken(username)
		
		if(hashedToken.hex() != packet.token):
			data.reply_channel.send({"close": True})

		if(packet.packetID == 1):
			sendChat(message, username)

	
# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	 Group('chat').discard(message.reply_channel)
	 Group('game').add(message.reply_channel)

def sendChat(message, username):

	Group('chat').send({
				'bytes': packet.encode(message, username),
	})
