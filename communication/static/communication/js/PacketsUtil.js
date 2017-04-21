function PacketsUtil()
{
    this.defval =
    function defval(value, defValue)
    {
        return (typeof value === "undefined") ? defValue : unescape(encodeURIComponent(value));
    }

    this.encodeString =
    function encodeString(dv, begin, str)
    {   
        for (var i = 0; i < str.length; i++) {
            dv.setUint8(begin + i, str.charCodeAt(i));
        }
    }

     this.decodeString =
    function decodeString(dv, begin, size)
    {   
        
        var uIntArray = [];
        
        for(var i = 0; i < size; i++)
        {
            uIntArray.push(dv.getUint8(begin + i));
        }

        var encodedString = String.fromCharCode.apply(null, uIntArray),
        decodedString = decodeURIComponent(escape(encodedString));
        
        return decodedString;
    }

    this.sendPacket =
    function sendPacket(packet)
    {
        packet.initClientPacket();
        var messageEncoded = packet.encode().buffer;

        ws.send(messageEncoded);
    }
}

var PacketsUtil = new PacketsUtil();
