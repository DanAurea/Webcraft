class Biome:
	def __init__(self, altitude, floorTile):
		self.altitude = altitude
		self.floorTile = floorTile

	def generate(self, world, chunk):
		pass


from game.server.biomes.biomeDesert import *
from game.server.biomes.biomePlain import *
from game.server.biomes.biomeSnow import *

class Biomes:
	DESERT = BiomeDesert(0.5, Tiles.SAND)
	SNOW = BiomeSnow(0.7, Tiles.SNOW)
	PLAIN  = BiomePlain(0.3, Tiles.GRASS)

	# Returns a biome depending of the climate
	# Params:
	#  - moist: Moist of the current position (0.0 ~ 1.0)
	#  - temperature: Temperature of the current position (0.0 ~ 1.0)
	def getBiomeForClimate(moist, temperature):
		if temperature > 0.66 and moist < 0.43:
			return Biomes.DESERT
		elif temperature < 0.65 and moist > 0.62:
			return Biomes.SNOW
		else:
			return Biomes.PLAIN
