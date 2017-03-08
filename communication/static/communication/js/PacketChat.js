function PacketChat(message)
{
    this.message     = PacketsUtil.defval(message, "-");
    this.messageSize = this.message.length;
    this.offset      = 0;

    this.handler =
    function handler()
    {
        console.log("Message recu : " + this.message + " size : " + this.messageSize);
        console.log(this);
    }

    this._encode = PacketChat.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        this.offset = this._getEncodePacketSize();

        dv.setInt32(this.offset, this.messageSize);
        this.offset += 4;

        PacketsUtil.encodeString(dv, this.offset, this.message);
        console.log(dv.buffer);
        return dv;
    }

    this._decode = PacketChat.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);

        //48 data begin index
        this.messageSize = dv.getInt32(52);
        this.message = PacketsUtil.decodeString(dv, 56, this.messageSize);

        return dv;
    }

    this._getEncodePacketSize = PacketChat.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        return this._getEncodePacketSize() + this.messageSize * 2 + 4;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 1;
    }
}

PacketChat.prototype = new Packet();
