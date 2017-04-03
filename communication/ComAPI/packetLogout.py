from struct import pack, unpack
from time import time
from communication.ComAPI.packet import Packet

class PacketLogout(Packet):
	"""Class for constructing binary data based
		on a common API between client / server."""

	def __init__(self):
		super().__init__()

		self.packetID = 6
	
	def encode(self, username, avatar, position):
		"""
			Encode a message with API format
			DRPG + PacketID + username length + username
		"""

		bContainer = super().encode()

		## Add position
		## TODO: Be aware of byte order from client for portable version
		bContainer = bContainer.__add__(pack(">B" , len(username) ))
		
		bContainer = bContainer.__add__(username.encode())

		return bContainer		