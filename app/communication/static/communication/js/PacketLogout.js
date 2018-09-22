function PacketLogout()
{
    this.username = "";
    this.usernameSize = 0;

    this.handler =
    function handler()
    {
        var entity = Entities.getPlayerByUsername(this.username);

        if(entity != null)
        {
            entity.despawn();
            scene.remove(entity.model);
        }
    }

    this._decode = PacketLogout.prototype.decode;
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

        return dv;
    }

    this._getDecodePacketSize = PacketLogout.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + 1 + username length
        return this._getDecodePacketSize() + this.usernameSize + this.username;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 6;
    }
}

PacketLogout.prototype = new Packet();
