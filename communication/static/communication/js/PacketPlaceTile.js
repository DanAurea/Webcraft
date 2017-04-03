function PacketPlaceTile(x, y, z, tileId)
{
    this.x = x;
    this.y = y;
    this.z = z;
    this.tileId = tileId;

    this.handler =
    function handler()
    {
        if(mapIsReady)
        {
            MapManager.setTileAt(this.tileId, this.x, this.y, this.z);
        }
        else
        {
            MapManager.queueTile(this.x, this.y, this.z, this.tileId);
        }
    }

    this._encode = PacketPlaceTile.prototype.encode;
    this.encode =
    function encode(data)
    {
        dv = this._encode();

        offset = this._getEncodePacketSize();

        dv.setUint32(offset, this.x);
        offset           += 4;

        dv.setUint32(offset, this.y);
        offset           += 4;

        dv.setUint32(offset, this.z);
        offset           += 4;

        dv.setUint32(offset, this.tileId);
        offset           += 4;

        return dv;
    }

    this._decode = PacketPlaceTile.prototype.decode;
    this.decode =
    function decode(data)
    {
        dv = this._decode(data);
        // Call parent method for getting current header size
        var offset       = this._getDecodePacketSize();

        this.x           = dv.getUint32(offset);
        offset           += 4;

        this.y           = dv.getUint32(offset);
        offset           += 4;

        this.z           = dv.getUint32(offset);
        offset           += 4;

        this.tileId       = dv.getUint32(offset);
        offset           += 4;

        return dv;
    }

    this._getEncodePacketSize = PacketPlaceTile.prototype.getEncodePacketSize;
    this.getEncodePacketSize =
    function getEncodePacketSize()
    {
        // Header size + message + messageSize
        return this._getEncodePacketSize() + 16;
    }

    this._getDecodePacketSize = PacketPlaceTile.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + 16;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 5;
    }
}

PacketPlaceTile.prototype = new Packet();
