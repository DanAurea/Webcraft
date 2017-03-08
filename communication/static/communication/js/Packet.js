function Packet()
{
    this.isServerPacket = false;
    this.uniqueToken    = "";
    this.timestamp      = 0;
    this.dataSize       = 0;
    this.packetId       = 0;
    this.offset         = 0;

    this.handle = null;

    this.encode =
    function encode()
    {
        var buffer = new ArrayBuffer(this.getEncodePacketSize());
        var dv = new DataView(buffer);

        // Encode header ID in packet
        PacketsUtil.encodeString(dv, this.offset, headerID);
        this.offset += headerID.length * 2;

        // Encode client token
        PacketsUtil.encodeString(dv, this.offset, this.uniqueToken);
        this.offset += this.uniqueToken.length * 2;

        // Encode packet type ID
        dv.setInt32(this.offset, this.packetId);
        this.offset += 4

        this.dataSize = this.getEncodePacketSize();
        dv.setInt32(this.offset, this.dataSize);

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
        return 88;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 0;
    }
}
