from channels.routing import route

channel_routing = [
	route('websocket.connect', "chat.consumers.ws_connect"),
    route('websocket.receive', "chat.consumers.ws_receive"),
    route('websocket.disconnect', "chat.consumers.ws_disconnect"),
]