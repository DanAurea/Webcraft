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
        this.READY = new PacketEntry(2, PacketReady);
        this.LOGIN = new PacketEntry(3, PacketLogin);
        this.MOVE = new PacketEntry(4, PacketMove);
        this.LOGOUT = new PacketEntry(5, PacketLogout);
    }
}

var Packets = new Packets();

headerID = "DRPG"
