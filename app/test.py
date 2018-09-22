from game.server.tiles.tiles import *
from game.server.world.world import *
from game.server.gen.chunkGenerator import *

print(Tiles.tileList)
myWorld = World("CoolName", 43538789734659, ChunkGenerator(), 4, 4);

myWorld.setTileAt(Tiles.GRASS, 2, 4, 2);
myWorld.setTileAt(Tiles.DIRT, 0, 0, 0);

print(myWorld.world.chunks[0].tiles[0:300]);
