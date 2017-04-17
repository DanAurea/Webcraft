from game.server.world.chunk import Chunk
from game.server.tiles.tiles import *

class World:

	def __init__(self, name, seed, generator, sizeX, sizeZ):
		self.name = name
		self.seed = seed
		self.generator = generator
		self.generator.setWorld(self);
		self.sizeX = sizeX
		self.sizeZ = sizeZ
		self.chunks = [None] * (sizeX * sizeZ)
		self.time = 0
		self.dayDuration = 12000

		#Fill chunk array
		for x in range(sizeX):
			for z in range(sizeZ):
				chunk = Chunk(x, z)
				self.generator.genChunk(chunk)
				self.chunks[x * sizeX + z] = chunk


	# Returns the chunk at x,z in chunk pos [0 -> sizeX / sizeZ]
	# Params:
	#  - x: X coordinate of the chunk
	#  - z: Z coordinate of the chunk
	def getChunkAtChunkPos(self, x, z):
		if(x < 0 or z < 0 or x >= self.sizeX or z >= self.sizeZ):
			return None

		return self.chunks[x * self.sizeX + z]



	# Returns the chunk at x,z in tile pos [0 -> (sizeX / sizeZ) * chunkSize]
	# Params:
	#  - x: X coordinate of the tile
	#  - z: Z coordinate of the tile
	def getChunkAt(self, x, z):
		return self.getChunkAtChunkPos(x >> 4, z >> 4)



	# Place a tile at x, y, z in the world.
	# Params:
	#  - tile: Tile instance defined in class Tiles
	#  - x: X pos of the tile
	#  - y: Y pos of the tile
	#  - z: Z pos of the tile
	def setTileAt(self, tile, x, y, z):
		chunk = self.getChunkAt(x, z)
		if(chunk != None):
			chunk.setTileAt(tile, x % Chunk.CHUNK_SIZE, y, z % Chunk.CHUNK_SIZE)



	# Returns the tile (Tile instance) at x,y,z in the world.
	# Params:
	#  - x: X pos of the tile
	#  - y: Y pos of the tile
	#  - z: Z pos of the tile
	def getTileAt(self, x, y, z):
		chunk = self.getChunkAt(x, z)
		if(chunk != None):
				return chunk.getTileAt(x % Chunk.CHUNK_SIZE, y, z % Chunk.CHUNK_SIZE)

		return None



	# Returns the biome at x,z in the world.
	# Params:
	#  - x: X pos of the tile
	#  - z: Z pos of the tile
	def getBiomeAt(self, x, z):
		chunk = self.getChunkAt(x, z)
		if(chunk != None):
				return chunk.biome;

		return None



	# Returns the surface (initial height without modification) at x,z in the world.
	# Params:
	#  - x: X pos of the tile
	#  - z: Z pos of the tile
	def getSurfaceAt(self, x, z):
		chunk = self.getChunkAt(x, z)
		if(chunk != None):
				return chunk.heightMap[x % Chunk.CHUNK_SIZE][z % Chunk.CHUNK_SIZE];

		return None
