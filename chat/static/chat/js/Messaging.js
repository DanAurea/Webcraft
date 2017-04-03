function activeChat(key, ev){

	if(key == "t"){
		$("#id_message").focus();
	}
	ev.preventDefault();
}

// Hide chat messages when focus is lost
$('#id_message').on('blur', function(event) {
	setTimeout(function() {  
			$("#messagesContainer").fadeOut(300);
	}, 2000);
});

// Show chat messages when focus is detected
$('#id_message').on('focus', function(event) {
	$("#messagesContainer").fadeIn(300);
});

// Send message on submit
$('#messageInput').on('submit', function(event) {

	var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
    var messageEncoded = messagePacket.encode().buffer;

    ws.send(messageEncoded);
    
    $("#id_message").val("");
    return false;
});