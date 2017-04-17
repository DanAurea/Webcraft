from opensimplex import OpenSimplex
from random import randint
import math, sys, random

from game.server.world.world import World
from game.server.biomes.biome import *
from game.server.tiles.tiles import *
from game.server.world.chunk import Chunk

class ChunkGenerator:

	def setWorld(self, world):
		self.world = world;
		self.genNoiseElev = OpenSimplex(world.seed * 5824389085730)
		self.genNoiseMoist = OpenSimplex(world.seed * 3674237955873)
		self.genNoiseTemp = OpenSimplex(world.seed * 8209480480238)

	def genChunk(self, chunk):
		biome = None
		for cX in range(Chunk.CHUNK_SIZE):
			rX = cX + chunk.x * Chunk.CHUNK_SIZE

			for cZ in range(Chunk.CHUNK_SIZE):
				rZ= cZ + chunk.z * Chunk.CHUNK_SIZE

				biome = self.getBiomeAt(rX, rZ)
				height = self.getHeightAt(rX, rZ);
				chunk.heightMap[cX][cZ] = height

				for y in range(height):
					chunk.setTileAt(self.getTileForDepth(y, height, biome), cX, y, cZ)

		chunk.biome = biome
		chunk.biome.generate(self.world, chunk)


	def getTileForDepth(self, cY, surface, biome):
		depth = surface - cY

		if(cY == 0):
			return Tiles.BEDROCK
		if(depth > 5):
			return Tiles.STONE
		elif(depth > 2):
			return Tiles.DIRT
		else:
			return biome.floorTile

	def getHeightAt(self, x, z):
		return int((self.genNoiseElev.noise2d(x / 200, z / 200) / 2.0 + 0.5) * 30)

	def getMoistAt(self, x, z):
		return self.genNoiseMoist.noise2d(x, z) / 2.0 + 0.5

	def getTemperatureAt(self, x, z):
		return self.genNoiseTemp.noise2d(x, z) / 2.0 + 0.5

	def getBiomeAt(self, x, z):
		x /= 120
		z /= 120
		moist = self.getMoistAt(x, z)
		temperature = self.getTemperatureAt(x, z)
		return Biomes.getBiomeForClimate(moist, temperature)
