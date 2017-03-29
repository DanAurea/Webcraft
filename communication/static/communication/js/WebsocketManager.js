var ws = new WebSocket((window.location.protocol == 'http') ? 'ws://' : 'ws://' +  window.location.host + '/DRPG/ws')

ws.binaryType = "arraybuffer";
Packets.init();

ws.onmessage = function(message) {

    var headerPacket  = new Packet().initClientPacket();
    headerPacket.decode(message.data);

    if(headerPacket.packetId == 1){
        handleChat(message);
    }
};