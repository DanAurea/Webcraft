function Packet()
{
    this.isServerPacket = false;
    this.uniqueToken    = ""; // Authenticate whose send message
    this.packetId       = 0; // Packet ID for interpreting purpose
    this.offset         = 0; // Represent bytes position in packet

    this.handle = null;

    this.encode =
    function encode()
    {
        var buffer = new ArrayBuffer(this.getEncodePacketSize());
        var dv = new DataView(buffer);

        // Encode header ID in packet
        PacketsUtil.encodeString(dv, this.offset, headerID);
        this.offset += headerID.length;

        // Encode client token
        PacketsUtil.encodeString(dv, this.offset, this.uniqueToken);
        this.offset += this.uniqueToken.length;

        // Encode packet type ID on 1 byte (256 ID possible)
        dv.setUint8(this.offset, this.packetId);
        this.offset += 4

        return dv;
    }

    this.decode =
    function decode(data)
    {
        dv = new DataView(data);

        this.offset      = headerID.length;
        this.packetId    = dv.getUint8(this.offset);

        return dv;
    }

    this.initClientPacket =
    function initClientPacket()
    {
        this.uniqueToken = TOKEN;
        this.packetId = this.getPacketId();

        return this;
    }

    this.getEncodePacketSize =
    function getEncodePacketSize()
    {   
        // Size of header packet (Header ID + Client token + packet ID)
        return headerID.length + TOKEN.length + 1;
    }

    this.getDecodePacketSize =
    function getDecodePacketSize()
    {   
        // Size of header packet (Header ID + Client token + packet ID)
        return headerID.length + 1;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 0;
    }
}
