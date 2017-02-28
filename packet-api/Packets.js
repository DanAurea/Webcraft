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

//TEST
TOKEN = "46E2A84f$416y8&D18c_SeV41-D8zD9Q";
