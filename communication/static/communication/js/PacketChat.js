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
        console.log("Message recu : " + this.message + " size : " + this.messageSize + " Pseudo: " + this.username + " timestamp: " + this.timestamp);
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

        console.log(this.timestamp);

        // Convert timestamp to human readable format
        d = new Date(this.timestamp * 1000);
        this.time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        
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
