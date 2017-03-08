import logging

from channels import Group
from channels.sessions import channel_session
from communication.ComAPI.packet import Packet

## Initliaze packet management class
packet = Packet()

# Consumer for chat connection using
# session for keeping token and
# using group for broadcast purpose
# 
# Currently only accept connection
# then add channel to group 'chat'
@channel_session
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
@channel_session
def ws_receive(message):

	## Debug purpose
	print(message.content["bytes"])
	packet.encode("Ceci est un test", 0)

	## Just a way to see how daphne / Django handle binary data
	## in purpose to make a python API for binary websocket communication.
	#print(message.content["bytes"])

	## Received binary datas from channel
	if(message.content["bytes"]):
		Group('chat').send({
			'bytes': message.content["bytes"],
	})

# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	 Group('chat').discard(message.reply_channel)