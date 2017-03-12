var chunkHeight = 256;

function Chunk(x, z)
{
    this.chunkX = x;
    this.chunkZ = z;
    this.group = null;
    this.map = Array(1024 * chunkHeight);
    this.maxHeight = chunkHeight;

    this.setTileAt =
    function setTileAt(tile, x, y, z)
    {
        if(x < 0 || y < 0 || z < 0 || x > 31 || y >= chunkHeight || z > 31)
        {
            return;
        }

        this.map[this.getIndexForCoords(x, y, z)] = tile;

        this.prepareChunkRender();

        //Update neighbours chunks
        var neighbours = [];
        if(x == 0)
        {
            neighbours.push(MapManager.getChunkAtChunkCoords(this.chunkX - 1, this.chunkZ));
        }
        else if(x == 31)
        {
            neighbours.push(MapManager.getChunkAtChunkCoords(this.chunkX + 1, this.chunkZ));
        }

        if(z == 0)
        {
            neighbours.push(MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ - 1));
        }
        else if(z == 31)
        {
            neighbours.push(MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ + 1));
        }

        if(neighbours.length > 0)
        {
            for(var i = 0, neighbourAmount = neighbours.length; i < neighbourAmount; i++)
            {
                if(neighbours[i] != null)
                {
                    neighbours[i].prepareChunkRender();
                }
            }
        }
    }

    this.getTileAt =
    function getTileAt(x, y, z)
    {
        return this.map[this.getIndexForCoords(x, y, z)];
    }

    this.getTileWithNeighbourChunkAt =
    function getTileWithNeighbourChunkAt(x, y, z)
    {
        var chunk = this;
        if(x < 0)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX - 1, this.chunkZ);
            x = 32 + x;
        }
        else if(x > 31)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX + 1, this.chunkZ);
            x = x - 32;
        }
        else if(z < 0)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ - 1);
            z = 32 + z;
        }
        else if(z > 31)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ + 1);
            z = z - 32;
        }

        return chunk == null ? 0 : chunk.map[chunk.getIndexForCoords(x, y, z)];
    }

    this.getIndexForCoords =
    function getIndexForCoords(x, y, z)
    {
        return y << 10 | x << 5 | z;
    }

    this.prepareChunkRender =
    function prepareChunkRender()
    {
        var oldMesh = this.group;

        this.group = new THREE.Object3D();
        var geometry = new THREE.Geometry();

        var cX = this.chunkX * 32;
        var cZ = this.chunkZ * 32;
        var rX, rZ;
        var x, y, z;
        var tile;
        for(x = 0; x < 32; x++)
        {
            rX = x + cX;
            for(z = 0; z < 32; z++)
            {
                rZ = z + cZ;
                for(y = 0; y < this.maxHeight; y++)
                {
                    tile = Tiles.getTile(this.getTileAt(x, y, z));
                    if(tile.isVisible())
                    {
                        if(tile.isSimpleCube())
                        {
                            TileRenderer.renderTile(geometry, this, tile, x, y, z, rX, rZ);
                        }
                        else
                        {
                            var model = ModelLoader.models[tile.model].clone();
                            model.position.x += x;
                            model.position.y += y;
                            model.position.z += z;
                            this.group.add(model);
                        }
                    }
                }
            }
        }

        mesh = new THREE.Mesh(geometry, Materials.tileMaterial);
        this.group.position.x = cX;
        this.group.position.z = cZ;
        this.group.add(mesh);
        scene.add(this.group);

        if(oldMesh != null)
        {
            scene.remove(oldMesh);
        }
    }

    //Generate Chunk - TEMP
    var length = this.map.length
    for(var i = 0; i < length; i++)
    {
        this.map[i] = 0;
    }

    for(var x = 0; x < 32; x++)
    {
        for(var z = 0; z < 32; z++)
        {
            var height = parseInt((noise.perlin2((this.chunkX * 32 + x) / 100, (this.chunkZ * 32 + z) / 100) + 1) * 10);
            this.maxHeight = Math.max(height, this.maxHeight);

            for(var y = 0; y < height; y++)
            {
                this.map[this.getIndexForCoords(x, y, z)] = Tiles.GRASS.id;
            }

            if(Math.random() < 0.1)
            {
                var veg = Math.floor(Math.random() * 3);
                this.map[this.getIndexForCoords(x, height, z)] = veg == 0 ? Tiles.GRASS_TALL.id : veg == 1 ? Tiles.FLOWER_RED.id : Tiles.FLOWER_BLUE.id;
            }
        }
    }
}
