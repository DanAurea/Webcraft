function PacketsUtil()
{
    this.defval =
    function defval(value, defValue)
    {
        return (typeof value === "undefined") ? defValue : value;
    }

    this.encodeString =
    function encodeString(dv, begin, str)
    {
        for(var i = 0; i < str.length; i++)
        {
            dv.setUint8(begin + i, str.charCodeAt(i));
        }
    }

    this.decodeString =
    function decodeString(dv, begin, size)
    {
        var strOut = "";
        for(var i = 0; i < size; i++)
        {
            strOut += String.fromCharCode(dv.getUint8(begin + i));
        }
        return strOut;
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
