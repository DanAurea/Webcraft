from channels.routing import route

channel_routing = [
	route('websocket.connect', "communication.consumers.ws_connect"),
    route('websocket.receive', "communication.consumers.ws_receive"),
    route('websocket.disconnect', "communication.consumers.ws_disconnect"),
]