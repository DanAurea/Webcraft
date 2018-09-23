# import game.runtime as Runtime
import multiprocessing

bind    = "0.0.0.0:8000"
backlog = 4096

worker_class="eventlet"
workers= multiprocessing.cpu_count() * 2 + 1

timeout      = 200
keepalive	 = 2

# TODO: Add security options to prevent DDOS attacks

def on_starting(server):
	print("Intializing server's instance...")

def on_exit(server):
	'''Save map before exiting'''
	print("Saving map due to interruption...")
	Runtime.saveInFile()