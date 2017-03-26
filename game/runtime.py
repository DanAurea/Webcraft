from game.mapGenerator import MapGenerator
import json
from os import path


class Runtime(object):
	""" Runtime class starting game loop and initialize game server side """
	
	settings = {}

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
	
	if('size' in settings):
		size = settings['size']
	else:
		size = 6
		
	map = MapGenerator(size).generate()

	@staticmethod
	def generate():
		print("Generating new map...")
		self.map = MapGenerator(self.size).generate()
		print("Done !")
		pass