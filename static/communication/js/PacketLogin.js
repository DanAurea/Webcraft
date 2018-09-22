function PacketLogin()
{
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.username = "";
    this.usernameSize = 0;
    this.avatar   = "";
    this.avatarSize = 0;

    this.handler =
    function handler()
    {

        //Us
        if(this.username == USERNAME)
        {   
            thePlayer = new EntityPlayer();
            thePlayer.setPosition(this.x, this.y, this.z);
            thePlayer.onLogin(this.username, this.avatar);
            thePlayer.spawn();

            finalizeGame();
        }
        else
        {   
            newPlayer = new EntityPlayer();
            newPlayer.setPosition(this.x, this.y, this.z);
            newPlayer.onLogin(this.username, this.avatar);
            newPlayer.spawn();
        }
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
        
        this.username     = PacketsUtil.decodeString(dv, offset, this.usernameSize);
        offset            += this.usernameSize;
        
        this.avatarSize   = dv.getUint8(offset);
        offset            += 1;
        
        
        this.avatar       = PacketsUtil.decodeString(dv, offset, this.avatarSize);
        offset            += this.avatarSize;
        
        
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
        // Header size + usernameSize + username + x + y + z
        return this._getDecodePacketSize() +  this.usernameSize + this.avatarSize + 14;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 3;
    }
}

PacketLogin.prototype = new Packet();
