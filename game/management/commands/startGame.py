from django.core.management import BaseCommand
from django.core import management
from multiprocessing import cpu_count
from game.mapGenerator import MapGenerator
import argparse

#The class must be named Command, and subclass BaseCommand
class Command(BaseCommand):
    # Show this when the user types help
	help = "Start game creating map and other stuff"
	
	def add_arguments(self, parser):
		parser.add_argument('generate')
		parser.add_argument('size')

	# A command must define handle()
	def handle(self, *args, **options):
		
		generate = int(options["generate"])
		size = int(options["size"])

		if(generate == 0 or generate == 1):
			print("Starting game...")

		if(generate == 1):
			print("Generating map...")
			map = MapGenerator(size)
			map.generate()
		elif(value == 0):
			pass
		else:
			print("Error: wrong arguments passed, try manage.py startGame 1.")