from random import randint
import random

from game.server.tiles.tiles import *
from game.server.biomes.biome import Biome
from game.server.world.chunk import Chunk

class BiomeDesert(Biome):
	def generate(self, world, chunk):
		rX = chunk.x * Chunk.CHUNK_SIZE
		rZ = chunk.z * Chunk.CHUNK_SIZE

		## Cactus
		for i in range(random.randint(1, 5)):
			cX = random.randint(0, Chunk.CHUNK_SIZE - 1)
			cZ = random.randint(0, Chunk.CHUNK_SIZE - 1)
			for j in range (random.randint(2, 4)):
				world.setTileAt(Tiles.CACTUS, rX + cX, chunk.heightMap[cX][cZ] + j, rZ + cZ)

		#Dead Bush
		for i in range(random.randint(1, 2)):
			cX = random.randint(0, Chunk.CHUNK_SIZE - 1)
			cZ = random.randint(0, Chunk.CHUNK_SIZE - 1)
			world.setTileAt(Tiles.DEADBUSH, rX + cX, chunk.heightMap[cX][cZ], rZ + cZ)
