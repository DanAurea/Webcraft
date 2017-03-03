function Packet()
{
    this.isServerPacket = false;
    this.uniqueToken = "";
    this.timestamp = 0;
    this.dataSize = 0;
    this.packetId = 0;

    this.handle = null;

    this.encode =
    function encode()
    {
        var buffer = new ArrayBuffer(this.getEncodePacketSize());
        dv = new DataView(buffer);

        PacketsUtil.encodeString(dv, 0, "DRPG");
        PacketsUtil.encodeString(dv, 4, this.uniqueToken);
        dv.setInt32(36, this.packetId);
        this.dataSize = this.getEncodePacketSize();
        dv.setInt32(48, this.dataSize);

        return dv;
    }

    this.decode =
    function decode(data)
    {
        dv = new DataView(data);

        this.packetId = dv.getInt32(36);
        //36 = 4bytes "DRPG" + Token
        this.timestamp = dv.getInt32(40) << 32 | dv.getInt32(44) & 0xFFFFFFFF;
        this.dataSize = dv.getInt32(48);

        return dv;
    }

    this.initClientPacket =
    function initClientPacket()
    {
        this.uniqueToken = TOKEN;
        this.timestamp = new Date().getTime();
        this.packetId = this.getPacketId();

        return this;
    }

    this.initServerPacket =
    function initServerPacket()
    {
        this.uniqueToken = "server";
        this.isServerPacket = true;
        this.packetId = this.getPacketId();

        return this;
    }

    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        return 52;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 0;
    }
}
