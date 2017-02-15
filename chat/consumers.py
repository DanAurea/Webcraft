import logging

from channels import Group
from channels.sessions import channel_session

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
	Group('chat').send({
		'text': message.content['text'],
	})

# Consumer for chat disconnection using
# session for keeping token and
# using group for broadcast purpose
@channel_session
def ws_disconnect(message):
	pass