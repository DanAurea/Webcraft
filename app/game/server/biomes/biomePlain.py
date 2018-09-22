from random import randint
import random

from game.server.tiles.tiles import *
from game.server.gen.treeGenerator import TreeGenerator
from game.server.biomes.biome import Biome
from game.server.world.chunk import Chunk

class BiomePlain (Biome):
	PLANTS_TILES = [Tiles.FLOWER_RED, Tiles.FLOWER_BLUE, Tiles.GRASS_TALL];

	def generate(self, world, chunk):
		rX = chunk.x * Chunk.CHUNK_SIZE
		rZ = chunk.z * Chunk.CHUNK_SIZE
		## Flowers
		for i in range(random.randint(2, 10)):
			cX = random.randint(0, Chunk.CHUNK_SIZE - 1)
			cZ = random.randint(0, Chunk.CHUNK_SIZE - 1)
			plant = random.randint(0, 2)

			world.setTileAt(BiomePlain.PLANTS_TILES[plant], rX + cX, chunk.heightMap[cX][cZ], rZ + cZ)
		## Trees
		for k in range (2, 4):
			cX = random.randint(0, Chunk.CHUNK_SIZE - 1)
			cZ = random.randint(0, Chunk.CHUNK_SIZE - 1)
			tree = TreeGenerator()
			tree.generateAt(rX + cX, chunk.heightMap[cX][cZ], rZ + cZ, world)
