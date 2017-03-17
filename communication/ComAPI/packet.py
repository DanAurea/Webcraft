## Documentation channels / binary
##https://media.readthedocs.org/pdf/channels/latest/channels.pdf
##http://www.devdungeon.com/content/working-binary-data-python

from time import time
from struct import pack, unpack

class Packet():
	"""Class for constructing binary data based
		on a common API between client / server."""

	CLIENT_HEADER_SIZE = 37

	def __init__(self):
		## Define token in apps.py
		self.token     = ""
		self.headerID  = "DRPG"
		self.packetID  = 0
		self.secretKey = "c48w5OY0JpD&yHa"
	
	def encode(self):
		"""
			Encode header with server's API format
			DRPG + PacketID
		"""

		## Bytes to send
		bContainer = bytes()

		## First encode headerID and clientToken to bytes
		bContainer = bContainer.__add__("".join([self.headerID]).encode())

		## Then add packet ID to bytes
		bContainer = bContainer.__add__( bytes( [self.packetID] ) )
		
		return bContainer		

	def decode(self, data):
		"""
			Decode header with client's API format
			DRPG + TokenClient + packetID 
		"""

		## Decode token from fifth (array index) bytes
		self.token = data[4:36].decode()
		self.packetID = unpack(">B", data[36:37])[0]

	def encodeTimestamp64(self, timestamp, byteOrder = "big"):
		""" Encode timestamp in an 64 bits integer using
			ctypes and bitshift"""

		if byteOrder == "big":
			return pack(">d", timestamp)
		elif byteOrder == "little":
			return pack("<d", timestamp)

	def getTimestamp(self):
		""" 
			Get current timestamp in float type.
		"""
		return time()