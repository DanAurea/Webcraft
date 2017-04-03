from struct import pack, unpack
from time import time
from communication.ComAPI.packet import Packet

class PacketPlaceTile(Packet):
	"""Class for constructing binary data based
		on a common API between client / server."""

	def __init__(self):
		super().__init__()

		self.packetID = 5
	
	def encode(self, tX, tY, tZ, tileID):
		"""
			Encode a message with API format
			DRPG + PacketID + tX + tY + tZ + tileID
		"""

		bContainer = super().encode()

		## Add position
		## TODO: Be aware of byte order from client for portable version
		bContainer = bContainer.__add__(pack(">I" , tX))
		bContainer = bContainer.__add__(pack(">I" , tY))
		bContainer = bContainer.__add__(pack(">I" , tZ))
		bContainer = bContainer.__add__(pack(">I" , tileID))
		
		return bContainer		

	def decode(self, data):
		"""
			Decode a message with API client format
			DRPG + TokenClient + PacketID + tX + tY + tZ + tileID
		"""
		super().decode(data)

		tX = unpack(">I" , data[37:41])[0]
		tY = unpack(">I" , data[41:45])[0]
		tZ = unpack(">I" , data[45:49])[0]
		tileID = unpack(">I" , data[49:53])[0]

		## Finally return message sent by client
		return tX, tY, tZ, tileID