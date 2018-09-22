from django.core.management import BaseCommand
from django.core import management
import game.runtime as Runtime
import argparse
import json

#The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):
    # Show this when the user types help
	help = "Start game creating map and other stuff"
	
	def add_arguments(self, parser):
		parser.add_argument(
		'--generate',
		action='store_true',		
		help='Force generation of new map',
		)
		parser.add_argument(
		'--size',
		nargs='?',
		type=int,
		help='Set size of map',
		)
		parser.add_argument(
		'--time',
		nargs='?',
		type=int,
		help='Set time (as tick rate) on server',
		)
		parser.add_argument(
		'--duration',
		nargs='?',
		type=int,
		help='Set ticks number for day cycling',
		)

	# A command must define handle()
	def handle(self, *args, **options):

		settings = {}

		## Set size of map
		if(options['size']):
			settings["size"] = options['size']
		
		## Generating a new map
		if(options['generate']):
			settings['generate'] = True
		else:
			settings['generate'] = False

		## Set time of day (as a tick number)
		if(options['time']):
			settings['time'] = options['time']

		## Set duration day (as a tick rate number)
		if(options['duration']):
			settings['duration'] = options['duration']

		with open('game/settings.json', 'w') as outfile:
			json.dump(settings, outfile)

		Runtime.loadMap()