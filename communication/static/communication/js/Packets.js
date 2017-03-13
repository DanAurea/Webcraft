function PacketEntry(id, className)
{
    this.className = className;
    Packets.packetRegistry[id] = this;
}

function Packets()
{
    this.packetRegistry = {};

    this.init =
    function init()
    {
        this.CHAT = new PacketEntry(1, PacketChat);
    }
}

var Packets = new Packets();

headerID = "DRPG"