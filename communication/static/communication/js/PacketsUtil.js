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
            dv.setInt16(begin + i * 2, str.charCodeAt(i));
        }
    }

    this.decodeString =
    function decodeString(dv, begin, size)
    {
        var strOut = "";
        for(var i = 0; i < size; i++)
        {
            strOut += String.fromCharCode(dv.getInt16(begin + i * 2));
        }
        return strOut;
    }
}

var PacketsUtil = new PacketsUtil();
