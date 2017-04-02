from struct import pack, unpack
from time import time
from communication.ComAPI.packet import Packet

class PacketMove(Packet):
	"""Class for constructing binary data based
		on a common API between client / server."""

	def __init__(self):
		super().__init__()

		self.packetID = 4
	
	def encode(self, **kwargs):
		"""
			Encode a message with API format
			DRPG + PacketID + username length + username
			+ x + y + z + pitch + yaw
		"""

		bContainer = super().encode()

		username =kwargs.get("username", None)

		## Add position
		## TODO: Be aware of byte order from client for portable version
		bContainer = bContainer.__add__(pack(">B", len(username)))
		bContainer = bContainer.__add__(username.encode())

		## Encode player movement
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('x', None)))
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('y', None)))
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('z', None)))
		
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('pitch', None)))
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('yaw', None)))

		bContainer = bContainer.__add__(pack(">f" , kwargs.get('motionX', None)))
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('motionY', None)))
		bContainer = bContainer.__add__(pack(">f" , kwargs.get('motionZ', None)))
		
		return bContainer		

	def decode(self, data):
		"""
			Decode a message with API client format
			DRPG + TokenClient + PacketID + x + y + z + pitch + yaw 
		"""
		super().decode(data)

		x = unpack(">f" , data[37:41])[0]
		y = unpack(">f" , data[41:45])[0]
		z = unpack(">f" , data[45:49])[0]
		
		pitch = unpack(">f" , data[49:53])[0]
		yaw = unpack(">f" , data[53:57])[0]
		
		motionX = unpack(">f" , data[57:61])[0]
		motionY = unpack(">f" , data[61:65])[0]
		motionZ = unpack(">f" , data[65:69])[0]

		## Finally return message sent by client
		return x, y, z, pitch, yaw, motionX, motionY, motionZ