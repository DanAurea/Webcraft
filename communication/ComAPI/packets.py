## Dealing with lambdas as circular dependencies solution
import communication.ComAPI.packet
packetMod = lambda: communication.ComAPI.packet
import communication.ComAPI.packetChat 
packetChatMod = lambda: communication.ComAPI.packetChat
import communication.ComAPI.packetPlaceTile 
packetPlaceTileMod = lambda: communication.ComAPI.packetPlaceTile
import communication.ComAPI.packetLogin
packetLoginMod = lambda: communication.ComAPI.packetLogin 
import communication.ComAPI.packetLogout 
packetLogoutMod = lambda: communication.ComAPI.packetLogout
import communication.ComAPI.packetMove 
packetMoveMod = lambda: communication.ComAPI.packetMove

packet = packetMod().Packet()
packetChat = packetChatMod().PacketChat()
packetLogin = packetLoginMod().PacketLogin()
packetMove = packetMoveMod().PacketMove()
packetPlaceTile = packetPlaceTileMod().PacketPlaceTile()
packetLogout = packetLogoutMod().PacketLogout()

packets = [packet, packetChat, None, packetLogin, packetMove, packetPlaceTile, packetLogout]