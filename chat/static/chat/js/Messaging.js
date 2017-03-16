function activeChat(key){

	if(key == "t"){
		$("#id_message").focus();
	}
}


function handleChat(message){
	var messagePacket = new PacketChat().initClientPacket();
	messagePacket.decode(message.data);

	// Append new message on chat container
	$('#messagesList').append(
		'<li>'
		+ '<span>' + messagePacket.time + ' - </span>'
		+'<span class=\'pseudo\'>' + messagePacket.username + ': </span>'
		+ '<span class=\'message\'>' + messagePacket.message + '</span>'
		+ 
		'</li>'
	);

	// Update scroll bar
	$("messagesContainer").mCustomScrollbar("scrollTo","last");
	$("#messagesContainer").fadeIn(300);

	// Hide messages if focus is not on chat
	// (only for visibility purpose)
	if($("#id_message").is(":focus") ==  false){
		setTimeout(function() {  
			$("#messagesContainer").fadeOut(300);
		}, 2000);
	}
}

// Hide chat messages when focus is lost
$('#id_message').on('blur', function(event) {
	$("#messagesContainer").fadeOut(300);
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