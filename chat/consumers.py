import logging

from channels import Group
from channels.sessions import channel_session
from communication.ComAPI.packetChat import PacketChat

## Initliaze packet management class
packet = PacketChat()

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
def ws_receive(data):

	message = packet.decode(data.content["bytes"])

	## Received binary datas from channel
	if(data.content["bytes"]):
		Group('chat').send({
			'bytes': packet.encode(message),
	})

# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	 Group('chat').discard(message.reply_channel)