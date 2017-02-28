function Packet()
{
    this.isServerPacket = false;
    this.uniqueToken = "";
    this.timestamp = 0;
    this.dataSize = 0;

    this.handle = null;

    this.encode =
    function encode()
    {
        var buffer = new ArrayBuffer(this.getEncodePacketSize());
        dv = new DataView(buffer);

        PacketsUtil.encodeString(dv, 4, this.uniqueToken);

        return dv;
    }

    this.decode =
    function decode(data)
    {
        dv = new DataView(data);

        //36 = 4bytes "DRPG" + Token
        this.timestamp = dv.getInt32(36) << 32 | dv.getInt32(40) & 0xFFFFFFFF;
        this.dataSize = dv.getInt32(44);

        return dv;
    }

    this.initClientPacket =
    function initClientPacket()
    {
        this.uniqueToken = TOKEN;
        this.timestamp = new Date().getTime();
        
        return this;
    }

    this.initServerPacket =
    function initServerPacket()
    {
        this.uniqueToken = -1;
        this.isServerPacket = true;

        return this;
    }

    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        return 48;
    }
}
