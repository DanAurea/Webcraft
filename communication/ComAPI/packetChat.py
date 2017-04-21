## Documentation channels / binary
##https://media.readthedocs.org/pdf/channels/latest/channels.pdf
##http://www.devdungeon.com/content/working-binary-data-python
## Should result in something like this from js client:
## b'DRPG46E2A84f$416y8&D18c_SeV41-D8zD9Q\x01\x00\x10Ceci est un test'
## Should result in something like this from python server:
## b'DRPG\x01A\xd61qw\x9fbl\x00\x1aCeci est un test'

from struct import pack, unpack
from time import time
from communication.ComAPI.packet import Packet

class PacketChat(Packet):
	"""Class for constructing binary data based
		on a common API between client / server."""

	def __init__(self):
		super().__init__()

		self.timestamp = super().getTimestamp()
		self.packetID  = 1
	
	def encode(self, message, username, getTimestamp = True):
		"""
			Encode a message with API format
			DRPG + PacketID + Timestamp
			+ Data size + Data 
		"""

		bContainer = super().encode()

		## TODO: Be aware of byte order for portable version
		if(getTimestamp is True):
			self.timestamp = super().getTimestamp()

		timestamp64 = super().encodeTimestamp64(self.timestamp)
		bContainer  = bContainer.__add__(timestamp64)

		## Add username size to bytes and encode it
		## TODO: Be aware of byte order from client for portable version
		bContainer = bContainer.__add__(pack(">B" , len(username)))
		bContainer = bContainer.__add__(username.encode())

		## Add message size to bytes and encode it
		## TODO: Be aware of byte order from client for portable version
		bContainer = bContainer.__add__(pack(">H" , len(message.encode())))
		bContainer = bContainer.__add__(message.encode())
		
		return bContainer		

	def decode(self, data):
		"""
			Decode a message with API client format
			DRPG + TokenClient + PacketID + Data size + Data 
		"""

		## TODO: Be aware of byte order from client for portable version
		super().decode(data)

		messageSize = unpack(">H", data[37:39])[0]

		## Overflow, data size don't fit with client header and message size 
		if(len(data) < super().CLIENT_HEADER_SIZE + messageSize):
			return False

		## Finally return message sent by client
		return data[39:39 + messageSize].decode()