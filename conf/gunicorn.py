# import game.runtime as Runtime
import multiprocessing

bind    = "0.0.0.0:8000"
backlog = 4096
preload = True

workers      = multiprocessing.cpu_count() * 2 + 1
worker_class ='gevent'

timeout      = 200
keepalive	 = 2

def on_exit(server):
	'''Save map before exiting'''
	print("Saving map due to interruption...")
	# Runtime.saveInFile