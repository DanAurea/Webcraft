from game.server.tiles.tiles import *

class Chunk:

	CHUNK_SIZE = 16
	CHUNK_HEIGHT = 256
	TILES_PER_CHUNKS = CHUNK_SIZE ** 2 * CHUNK_HEIGHT

	def __init__(self, x, z):
		self.x = x
		self.z = z
		self.tiles = [0] * (Chunk.CHUNK_SIZE ** 2 * Chunk.CHUNK_HEIGHT)
		self.tileClusters = None;
		self.heightMap = [[0 for x in range(Chunk.CHUNK_SIZE)] for y in range(Chunk.CHUNK_HEIGHT)];
		self.biome = None


	# Place a tile at x, y, z in the chunk.
	# Params:
	#  - tile: Tile instance defined in class Tiles
	#  - x: X pos of the tile
	#  - y: Y pos of the tile
	#  - z: Z pos of the tile
	def setTileAt(self, tile, x, y, z):
		if(x < 0 or y < 0 or z < 0 or x >= Chunk.CHUNK_SIZE or y >= Chunk.CHUNK_HEIGHT or z >= Chunk.CHUNK_SIZE):
			return

		self.tiles[self.getIndexForCoords(x, y, z)] = tile.id



	# Returns the tile (Tile instance) at x,y,z in the world.
	# Params:
	#  - x: X pos of the tile
	#  - y: Y pos of the tile
	#  - z: Z pos of the tile
	def getTileAt(self, x, y, z):
		if(x < 0 or y < 0 or z < 0 or x >= Chunk.CHUNK_SIZE or y >= Chunk.CHUNK_HEIGHT or z >= Chunk.CHUNK_SIZE):
			return Tiles.AIR

		return Tiles.getTile(self.tiles[self.getIndexForCoords(x, y, z)])



	# Returns 1D index for 3D array "tiles"
	# Params:
	#  - x: X coordiante to translate
	#  - y: Y coordiante to translate
	#  - z: Z coordiante to translate
	def getIndexForCoords(self, x, y, z):
		return y << 8 | x << 4 | z
