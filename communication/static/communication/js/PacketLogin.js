function PacketLogin()
{
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.username = "";
    this.avatar   = "";
    this.usernameSize = 0;

    this.handler =
    function handler()
    {
        console.log("Player logged !");
    }

    this._decode = PacketLogin.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);

        // Call parent method for getting current header size
        var offset        = this._getDecodePacketSize();
        
        this.usernameSize = dv.getUint8(offset);
        offset            += 1;
        
        this.username     = PacketsUtil.decodeString(dv, offset, usernameSize);
        offset            += usernameSize;
        
        avatarSize        = dv.getUint8(offset);
        offset            += 1;
        
        this.avatar       = PacketsUtil.decodeString(dv, offset, avatarSize);
        offset            += avatarSize;
        
        this.x            = dv.getFloat32(offset);
        offset            += 4;
        
        this.y            = dv.getFloat32(offset);
        offset            += 4;
        
        this.z            = dv.getFloat32(offset);
        offset            += 4;

        return dv;
    }

    this._getDecodePacketSize = PacketLogin.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + 8;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 3;
    }
}

PacketLogin.prototype = new Packet();
