function PacketReady()
{
    this.getPacketId =
    function getPacketId()
    {
        return 2;
    }
}

PacketReady.prototype = new Packet();
