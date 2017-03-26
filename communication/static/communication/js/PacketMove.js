function PacketMove(x, y, z, pitch, yaw)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.pitch   = pitch;
    this.yaw     = yaw;
    this.username = "";
    this.usernameSize = username.length;

    this.handler =
    function handler()
    {
        console.log("Player Move !");
    }

    this._encode = PacketMove.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        this.offset = this._getEncodePacketSize();

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

        this.username    = PacketsUtil.decodeString(dv, offset, usernameSize);
        offset           += usernameSize;

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


        return dv;
    }

    this._getEncodePacketSize = PacketMove.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        // Header size + message + messageSize
        return this._getEncodePacketSize() + 20;
    }

    this._getDecodePacketSize = PacketMove.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + 8;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 4;
    }
}

PacketMove.prototype = new Packet();
