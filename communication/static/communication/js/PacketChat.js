
// Add zero before numbers
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function PacketChat(message)
{
    this.message     = PacketsUtil.defval(message, "-");
    this.timestamp   = 0;
    this.time        = "";
    this.messageSize = this.message.length;
    this.username    = "";
    this.offset      = 0;

    this.handler =
    function handler()
    {
        // Append new message on chat container
        $('#messagesList').append(
            '<li>'
            + '<span>' + this.time + ' - </span>'
            +'<span class=\'pseudo\'>' + this.username + ': </span>'
            + '<span class=\'message\'>' + this.message + '</span>'
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

    this._encode = PacketChat.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        this.offset = this._getEncodePacketSize();

        dv.setUint16(this.offset, this.messageSize);
        this.offset += 2;

        PacketsUtil.encodeString(dv, this.offset, this.message);

        return dv;
    }

    this._decode = PacketChat.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);

        // Call parent method for getting current header size
        this.offset      = this._getDecodePacketSize();

        this.timestamp   = dv.getFloat64(this.offset);
        this.offset      += 8;

        // Convert timestamp to human readable format
        d = new Date(this.timestamp * 1000);
        this.time = addZero(d.getHours()) + ':' + addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());

        usernameSize     = dv.getUint8(this.offset);
        this.offset      += 1;

        this.username    = PacketsUtil.decodeString(dv, this.offset, usernameSize);
        this.offset      += usernameSize;

        this.messageSize = dv.getUint16(this.offset);
        this.offset      += 2;

        this.message     = PacketsUtil.decodeString(dv, this.offset, this.messageSize);

        return dv;
    }

    this._getEncodePacketSize = PacketChat.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        // Header size + message + messageSize
        return this._getEncodePacketSize() + this.messageSize + 2;
    }

    this._getDecodePacketSize = PacketChat.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + 8;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 1;
    }
}

PacketChat.prototype = new Packet();
