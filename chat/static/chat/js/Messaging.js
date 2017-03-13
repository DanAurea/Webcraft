ws.onmessage = function(message) {
	
	var messagePacket = new PacketChat().initClientPacket();
	messagePacket.decode(message.data);
	
	$('#messagesList').append(
		'<li>'
		+ '<span>' + messagePacket.time + ' - </span>'
		+'<span class=\'pseudo\'>' + messagePacket.username + ': </span>'
		+ '<span class=\'message\'>' + messagePacket.message + '</span>'
		+ 
		'</li>'
	);
};

$('#messageInput').on('submit', function(event) {

	var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
    var messageEncoded = messagePacket.encode().buffer;

    ws.send(messageEncoded);
    
    return false;
});
