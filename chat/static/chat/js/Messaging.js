// Create a new WebSocket
var ws = new WebSocket((window.location.protocol == 'http') ? 'ws://' : 'ws://' +  window.location.host + '/')
ws.binaryType = "arraybuffer";
Packets.init();

ws.onmessage = function(message) {

	var pseudo = 'Mon pseudo:';
	
	var messagePacket = new PacketChat().initClientPacket();
	messagePacket.decode(message.data);
	messagePacket.handler();

	$('#messagesList').append(
		 '<li><span class=\'pseudo\'>' + pseudo + '</span>'
		+ '<span class=\'message\'>' + messagePacket.message + '</span>'
		+ '</li>'
	);
};

$('#messageInput').on('submit', function(event) {

	var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
    var messageEncoded = messagePacket.encode().buffer;

    ws.send(messageEncoded);
    
    return false;
});
