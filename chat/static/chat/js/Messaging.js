// Create a new WebSocket
var ws = new WebSocket((window.location.protocol == 'http') ? 'ws://' : 'ws://' +  window.location.host + '/')

// Make it show an alert when a message is received
ws.onmessage = function(message) {

	var pseudo = 'Mon pseudo:';

	$('#messagesList').append(
		 '<li><span class=\'pseudo\'>' + pseudo + '</span>'
		+ '<span class=\'message\'>' + message.data + '</span>'
		+ '</li>'
	);
};

$('#messageInput').on('submit', function(event) {
	var message = $("#id_message");
    
    ws.send(message.val());
   	message.val("");
    return false;
});
