function ChatManager()
{
	this.isOpen = false;
	this.closeTimeOut = null;

	this.toggleChat =
	function toggleChat(key, ev)
	{
		if(!ChatManager.isOpen && key == "t")
		{
			MouseUtil.releasePointer();
			$("#id_message").focus();
		}
		else if(ChatManager.isOpen && key == "escape")
		{
			//Fix for Escape security
			$("#id_message").blur();
			setTimeout(function()
			{
				MouseUtil.attachPointer();
			}, 200);
		}
	}

	this.init =
	function init()
	{
		// Hide chat messages when focus is lost
		$('#id_message').on('blur', function(event)
		{
			ChatManager.isOpen = false;
			clearTimeout(ChatManager.closeTimeOut);
			ChatManager.closeTimeOut = setTimeout(function()
			{
				if(!ChatManager.isOpen)
				{
					$("#messagesContainer").fadeOut(400);
				}
			}, 2000);
		});

		// Show chat messages when focus is detected
		$('#id_message').on('focus', function(event)
		{
			clearTimeout(ChatManager.closeTimeOut);
			$("#messagesContainer").fadeIn(400);
			ChatManager.isOpen = true;
		});

		// Send message on submit
		$('#messageInput').on('submit', function(event)
		{
			if(!offlineMode)
			{
				var messagePacket = new PacketChat($("#id_message").val()).initClientPacket();
			    var messageEncoded = messagePacket.encode().buffer;

			    ws.send(messageEncoded);
			}
			else
			{
				ChatManager.onMessageReceive("00:00:00", thePlayer.username, $("#id_message").val());
			}

		    $("#id_message").val("");
		    return false;
		});
	}

	this.onMessageReceive =
	function onMessageReceive(time, username, message)
	{
		// Append new message on chat container
        $('#messagesList').append(
            '<li>'
            + '<span>' + time + ' - </span>'
            +'<span class=\'pseudo\'>' + username + ': </span>'
            + '<span class=\'message\'>' + message + '</span>'
            +
            '</li>'
        );

        // Update scroll bar
		$("#messagesContainer").fadeIn(1000);
        $("#messagesContainer").mCustomScrollbar("scrollTo", "last", {scrollInertia:0});


		clearTimeout(ChatManager.closeTimeOut);
		ChatManager.closeTimeOut = setTimeout(function()
		{
			if(!ChatManager.isOpen)
			{
				$("#messagesContainer").fadeOut(1000);
			}
		}, 2000);
	}
}

var ChatManager = new ChatManager();
