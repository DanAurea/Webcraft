var ws = new WebSocket(((window.location.protocol == 'https:') ? 'wss://' : 'ws://') +  window.location.host + '/ws/chat')

ws.binaryType = "arraybuffer";
Packets.init();

ws.onmessage = function(message) {

    var headerPacket  = new Packet();
    headerPacket.decode(message.data);

    var id = headerPacket.packetId;
    entry = Packets.packetRegistry[id];

    if(entry != null)
    {
    	packet = new entry.className();
    	packet.decode(message.data);
    	packet.handler();
    }

};