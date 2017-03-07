// Create a new WebSocket
var ws = new WebSocket((window.location.protocol == 'http') ? 'ws://' : 'ws://' +  window.location.host + '/')
Packets.init();

ws.onmessage = function(message) {

	var pseudo = 'Mon pseudo:';
	
	var messagePacket = new PacketChat().initServerPacket();
	// incomingChatPacket.decode(message);
	// incomingChatPacket.handler();

	$('#messagesList').append(
		 '<li><span class=\'pseudo\'>' + pseudo + '</span>'
		+ '<span class=\'message\'>' + message.data + '</span>'
		+ '</li>'
	);
};

$('#messageInput').on('submit', function(event) {

	var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
    var messageEncoded = messagePacket.encode().buffer;

    ws.send(messageEncoded);
    
    return false;
});
