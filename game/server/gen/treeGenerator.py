from random import randint
import random

from game.server.tiles.tiles import *

class TreeGenerator:
	MUSHROOMS = [Tiles.RED_MUSH, Tiles.BROWN_MUSH];

	def generateAt(self, x, y, z, world):
		from game.server.biomes.biome import Biomes

		height = random.randint(6, 9)

		for i in range (height):
			#leaves
			if(i > height -4):
				leaves = 1 if i == height - 1 else 2;
				for j in range(x - leaves, x + leaves + 1):
					for k in range (z - leaves, z + leaves + 1):
						world.setTileAt(Tiles.LEAVES, j, y + i, k)
						#Snow Tile in snow biomes
						if(world.getBiomeAt(x, z) == Biomes.SNOW):
							world.setTileAt(Tiles.SNOW_TILE, j, y + i + 1, k)

						if(world.getBiomeAt(x, z) != Biomes.SNOW):
							#Apple
							if(i== height - 3 and i != x and k != z):
								if(random.randint(1, 40) == 1):
									world.setTileAt(Tiles.APPLE, j, y + i - 1, k)
							#Mushrooms
							if(height == 6 and i != x and k != z and random.randint(1, 50) == 1):
								a = random.randint(0, 1)
								world.setTileAt(TreeGenerator.MUSHROOMS[a], j, world.getSurfaceAt(j, k), k)

			#Wood Log
			if(i < height - 1):
				world.setTileAt(Tiles.LOG, x, y + i, z)
