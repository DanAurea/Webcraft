from channels.routing import ProtocolTypeRouter, URLRouter
from communication.consumers import ChatConsumer, GameConsumer
from channels.auth import AuthMiddlewareStack
from django.conf.urls import url

application = ProtocolTypeRouter({
	"websocket": AuthMiddlewareStack(
		URLRouter([
			url(r"^ws/chat$", ChatConsumer),
			url(r"^ws/game$", GameConsumer)
		])
	)
})