function PacketLogout()
{
    this.username = "";
    this.usernameSize = username.length;

    this.handler =
    function handler()
    {
        console.log("Player logout !");
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

        this.username    = PacketsUtil.decodeString(dv, offset, usernameSize);
        offset           += usernameSize;

        return dv;
    }

    this._getDecodePacketSize = PacketLogout.prototype.getDecodePacketSize;
    this.getDecodePacketSize =
    function getDecodePacketSize()
    {
        // Header size + Timestamp (64 bits)
        return this._getDecodePacketSize() + 8;
    }

    this.getPacketId =
    function getPacketId()
    {
        return 6;
    }
}

PacketLogout.prototype = new Packet();
