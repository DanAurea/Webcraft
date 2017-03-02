function PacketChat(message)
{
    this.message = PacketsUtil.defval(message, "-");
    this.messageSize = this.message.length;

    this.handler =
    function handler()
    {
        console.log("Message recu : " + this.message + " size : " + this.messageSize);
    }

    this._encode = PacketChat.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        dv.setInt32(48, this.messageSize);
        PacketsUtil.encodeString(dv, 52, this.message);

        return dv;
    }

    this._decode = PacketChat.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);

        //48 data begin index
        this.messageSize = dv.getInt32(48);
        this.message = PacketsUtil.decodeString(dv, 52, this.messageSize);

        return dv;
    }

    this._getEncodePacketSize = PacketChat.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        return this._getEncodePacketSize() + this.messageSize * 2 + 4;
    }
}

PacketChat.prototype = new Packet();
