from game.mapGenerator import MapGenerator

class Runtime(object):
	""" Runtime class starting game loop and any dependecies"""

	def __init__(self, size):
		## Tick state
		self.timeDay = 0
		## Duration day based on tickstate (10 min here => 10 * 60 * 20 ticks/s)
		self.durationDay = 12000
		self.size = size
		self.mapGenerator = MapGenerator(size)
		self.map = self.mapGenerator.generate()
		self.seedColor = self.mapGenerator.seedColor


run = Runtime(4)
RT_timeDay = run.timeDay
RT_durationDay = run.durationDay
RT_size = run.size
RT_seedColor = run.seedColor
RT_map = run.map