from game.mapGenerator import MapGenerator, Chunk
from datetime import datetime
from os import path, remove
from glob import glob
from django.core.cache import cache
import json
import pickle
import game.mapGenerator as MapInfo

""" Runtime module starting game loop and initialize game server side """

sizeChunk = 1024

## Save interval in hours
saveInterval = 2
## When reset save and keep the last one in hours (by day currently)
saveReset    = 24

settings = {'generate': False}

if(path.isfile('game/settings.json')):
	with open('game/settings.json') as jsonData:
		settings = json.load(jsonData)
else:
	print("Warning: No settings.json found in game app directory !")

## Tick state
if('time' in settings):
	timeDay = settings['time']
else:
	timeDay = 0

## Duration day based on tickstate (10 min here => 10 * 60 * 20 ticks/s)
if('duration' in settings):
	durationDay = settings['duration']
else:
	durationDay = 12000

## Set size of map
if('size' in settings):
	size = settings['size']
else:
	size = 6
	
def generate():
	"""Generate a new map"""
	global map
	print("Generating new map...")
	map = MapGenerator(size).generate()
	print("Done !")
	pass

def saveInFile():
	"""Save map in a binary file """
	global map
	now = datetime.now()
	time = now.strftime("%Y-%m-%d-%H-%M-%S")
	saveFile = "".join(['game/saves/DRPG-', time, '.map'])

	files = glob('game/saves/*.map')
	numberFiles = len(files)

	## Remove all unecessary saves if enough saves had been made
	if(numberFiles >= saveReset / saveInterval):
		for file in files[:-1]:
			remove(file)

	# We reconstruct an empty from redis datas
	# so we need to start from a new instance of
	# map generator.
	map = [[0 for row in range(size)] for col in range(size)]

	for i in range(0, size):
		for j in range(0, size):
			chunkInst = Chunk(i, j)
			chunkInst.chunk = reassemble(i, j)
			map[i][j] = chunkInst

	with open(saveFile, 'wb') as save:
		pickle.dump(map, save)

def chunks(l, n):
    """Yield successive n-sized chunks from l."""
    for i in range(0, len(l), n):
        yield l[i:i + n]

def reassemble(x, z): 
	"""	Reassemble a dispatched chunk from redis"""

	nbDivisions = int(MapInfo.nbTilesByChunk / sizeChunk)
	
	chunk = []	

	for i in range(0, nbDivisions):
		key      = "".join(["map_", str(x), "_", str(z), "_", str(i)])
		division = cache.get(key)
		chunk.append(division)

	chunk = [item for sublist in chunk for item in sublist]

	return chunk

def subdivideMap():
	"""Subdivide map chunks in data chunks for
		a smoother update in redis cache."""
	global map
	for arr in map:
			for chunkObj in arr:
					chunkObj.chunk = list(chunks(chunkObj.chunk, sizeChunk))

def saveInRedis():
	"""Save in Redis all chunks previously subdivided."""
	
	for rowIndex, row in enumerate(map):
		for colIndex, col in enumerate(row):
			for chunkIndex, chunk in enumerate(col.chunk):
				key = "".join(["map_", str(rowIndex), "_", str(colIndex), "_",str(chunkIndex)])
				cache.set(key, chunk, timeout=None)

def loadMap():
	""" Load map from latest save """
	global map
	files      = glob('game/saves/*.map')

	if(not files or settings['generate'] == True):
		generate()
	else:
		latestSave = max(files, key=path.getctime)

		with open(latestSave, 'rb') as save:
			map = pickle.load(save)

	subdivideMap()
	saveInRedis()
		
	if(not files or settings['generate'] == True):
		saveInFile()