function PacketMove(x, y, z, pitch, yaw, motionX, motionY, motionZ)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.pitch   = pitch;
    this.yaw     = yaw;
    this.motionX = motionX;
    this.motionY = motionY;
    this.motionZ = motionZ;
    this.username = "";
    this.usernameSize = 0;

    this.handler =
    function handler()
    {
        if(this.username != USERNAME)
        {
            var username = this.username;
            var entity = Entities.getPlayerByUsername(username);
            
            if(entity != null)
            {
                entity.setPosition(this.x, this.y, this.z);
                entity.setCamera(this.pitch, this.yaw);
                entity.setMotion(this.motionX, this.motionY, this.motionZ);
            }
        }
    }

    this._encode = PacketMove.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        var offset = this._getEncodePacketSize();

        dv.setFloat32(offset, this.x);
        offset           += 4;

        dv.setFloat32(offset, this.y);
        offset           += 4;

        dv.setFloat32(offset, this.z);
        offset           += 4;

        dv.setFloat32(offset, this.pitch);
        offset           += 4;

        dv.setFloat32(offset, this.yaw);
        offset           += 4;

        dv.setFloat32(offset, this.motionX);
        offset           += 4;

        dv.setFloat32(offset, this.motionY);
        offset           += 4;

        dv.setFloat32(offset, this.motionZ);
        offset           += 4;

        return dv;
    }

    this._decode = PacketMove.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);

        // Call parent method for getting current header size
        var offset       = this._getDecodePacketSize();

        this.usernameSize     = dv.getUint8(offset);
        offset           += 1;

        this.username    = PacketsUtil.decodeString(dv, offset, this.usernameSize);
        offset           += this.usernameSize;

        this.x           = dv.getFloat32(offset);
        offset           += 4;

        this.y           = dv.getFloat32(offset);
        offset           += 4;

        this.z           = dv.getFloat32(offset);
        offset           += 4;

        this.pitch       = dv.getFloat32(offset);
        offset           += 4;

        this.yaw         = dv.getFloat32(offset);
        offset           += 4;

        this.motionX         = dv.getFloat32(offset);
        offset           += 4;

        this.motionY         = dv.getFloat32(offset);
        offset           += 4;

        this.motionZ         = dv.getFloat32(offset);
        offset           += 4;

        return dv;
    }

    this._getEncodePacketSize = PacketMove.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        // Header size + message + messageSize
        return this._getEncodePacketSize() + this.usernameSize + 33;
    }

    this._getDecodePacketSize = PacketMove.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + this.usernameSize + 33;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 4;
    }
}

PacketMove.prototype = new Packet();
