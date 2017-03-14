// $("messagesContainer").mCustomScrollbar({ setHeight: 20, setTop: "50px" });

function handleChat(message){
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

	$("messagesContainer").mCustomScrollbar("scrollTo","last");
	$("#id_message").val("");
}

ws.onmessage = function(message) {
	
	var headerPacket  = new Packet().initClientPacket();
	headerPacket.decode(message.data);

	if(headerPacket.packetId == 1){
		handleChat(message);
	}
};

$('#messageInput').on('submit', function(event) {

	var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
    var messageEncoded = messagePacket.encode().buffer;

    ws.send(messageEncoded);
    
    return false;
});
