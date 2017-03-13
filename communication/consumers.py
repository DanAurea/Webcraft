import logging

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from communication.ComAPI.packetChat import PacketChat

## Initliaze packet management class
packet = PacketChat()

# Consumer for chat connection using
# session for keeping token and
# using group for broadcast purpose
# 
# Currently only accept connection
# then add channel to group 'chat'
@channel_session_user_from_http
def ws_connect(message):
	message.reply_channel.send({
        'accept': True
	})

	Group('chat').add(message.reply_channel)

# Consumer for chat message received using
# session for keeping token and
# using group for broadcast purpose
# 
# Currently it just send back what it receive
@channel_session_user
def ws_receive(data):

	## Received binary datas from channel
	if(data.content["bytes"]):
		message = packet.decode(data.content["bytes"])
		
		## TODO: Add safety check, check if username is in database + password + secretkey 
		## then check clientToken to new hashed value.

		if(packet.packetID == 1):
			sendChat(message, data.user.username)

	
# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	 Group('chat').discard(message.reply_channel)

def sendChat(message, username):

	Group('chat').send({
				'bytes': packet.encode(message, username),
	})
