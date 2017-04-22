from game.server.world.world import World
from game.server.world.chunk import Chunk
from game.server.gen.chunkGenerator import ChunkGenerator
from datetime import datetime
from os import path, remove
from random import randint
import random
from glob import glob
from django.core.cache import cache
import json
import pickle

def getSettings(key, defaultValue):
	if(key in settings):
		return settings[key]
	else:
		return defaultValue

def generate():
	"""Generate a new world"""
	global world
	print("Generating new world...")
	world = World(name, seed, ChunkGenerator(), size, size);
	print("Done !")
	pass

def saveInFile():
	"""Save world in a binary file """
	global world
	now = datetime.now()
	time = now.strftime("%Y-%m-%d-%H-%M-%S")
	saveFile = "".join(['game/saves/DRPG-', time, '.world'])

	files = glob('game/saves/*.world')
	numberFiles = len(files)

	## Remove all unecessary saves if enough saves had been made
	if(numberFiles >= saveReset / saveInterval):
		for file in files[:-1]:
			remove(file)

	# We reconstruct an empty from redis datas
	# so we need to start from a new instance of
	# world generator.
	world = [[0 for row in range(size)] for col in range(size)]

	for i in range(0, size):
		for j in range(0, size):
			chunkInst = Chunk(i, j)
			key = "".join(["chunk_", str(i), "_", str(j)])
			chunkInst.chunk = cache.get(key)
			world[i][j] = chunkInst

	with open(saveFile, 'wb') as save:
		pickle.dump(world, save)

def saveInRedis():
	"""Save in Redis all chunks previously subdivided into clusters."""

	for chunk in world.chunks:
			key = "".join(["chunk_", str(chunk.x), "_", str(chunk.z)])
			cache.set(key, chunk, timeout=None)

def compressChunk(tiles):
	""" Compress an array of tiles counting sequence of same numbers """
	compressedChunk =  []
	countVal = 1
	buffer = tiles[0]
	size = len(tiles) - 1

	## Compressing loop with RLE encoding
	index = 0
	for tile in tiles:
		if(index == 0):
			index += 1;
			continue

		if(index == size):

			if(buffer != tile):
				compressedChunk.append(str(tile))
			else:
				compressedChunk.append(str(countVal + 1) + ":" + str(buffer))

		elif(buffer != tile):

			if(countVal == 1):
				compressedChunk.append(str(buffer))
			else:
				compressedChunk.append(str(countVal) + ":" + str(buffer))

			buffer = tile
			countVal = 1
		else:
			countVal += 1
		index += 1

	return compressedChunk

def loadMap():
	""" Load world from latest save """
	global world
	files      = glob('game/saves/*.world')

	if(not files or settings['generate'] == True):
		generate()
	else:
		latestSave = max(files, key=path.getctime)

		with open(latestSave, 'rb') as save:
			world = pickle.load(save)

	saveInRedis()

	if(not files or settings['generate'] == True):
		saveInFile()


""" Runtime module starting game loop and initialize game server side """

clusterSize = 1024

## Save interval in hours
saveInterval = 2
## When reset save and keep the last one in hours (by day currently)
saveReset    = 24

settings = {'generate': False, 'worldName': 'Cool name', 'worldSeed': 418416568}

if(path.isfile('game/settings.json')):
	with open('game/settings.json') as jsonData:
		settings = json.load(jsonData)
else:
	print("Warning: No settings.json found in game app directory !")

## Tick state
timeDay = getSettings('time', 0)

## Duration day based on tickstate (10 min here => 10 * 60 * 20 ticks/s)
durationDay = getSettings('duration', 12000)

## Set size of world
size = getSettings('size', 6)

## Set name of world
name = getSettings('worldName', 'No name')

## Set seed of world
seed = getSettings('worldSeed', random.randint(0, 99999999999))
