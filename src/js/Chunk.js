var chunkHeight = 256;

function Chunk(x, z)
{
    this.chunkX = x;
    this.chunkZ = z;
    this.mesh = null;
    this.map = Array(256 * chunkHeight);
    this.maxHeight = chunkHeight;

    this.setTileAt =
    function setTileAt(tile, x, y, z)
    {
        if(x < 0 || y < 0 || z < 0 || x > 15 || y >= chunkHeight || z > 15)
        {
            return;
        }

        this.map[this.getIndexForCoords(x, y, z)] = tile;

        this.prepareChunkRender();
        //TODO update neighbours
    }

    this.getTileAt =
    function getTileAt(x, y, z)
    {
        if(x < 0 || y < 0 || z < 0 || x > 15 || y >= chunkHeight || z > 15)
        {
            return 0;
        }

        return this.map[this.getIndexForCoords(x, y, z)];
    }

    this.getTileWithNeighbourChunkAt =
    function getTileWithNeighbourChunkAt(x, y, z)
    {
        var chunk = this;
        if(x < 0)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX - 1, this.chunkZ);
            x = 16 + x;
        }
        else if(x > 15)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX + 1, this.chunkZ);
            x = x - 16;
        }
        else if(z < 0)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ - 1);
            z = 16 + z;
        }
        else if(z > 15)
        {
            chunk = MapManager.getChunkAtChunkCoords(this.chunkX, this.chunkZ + 1);
            z = z - 16;
        }

        return chunk == null ? 0 : chunk.map[chunk.getIndexForCoords(x, y, z)];
    }

    this.getIndexForCoords =
    function getIndexForCoords(x, y, z)
    {
        return y << 8 | x << 4 | z;
    }

    this.prepareChunkRender =
    function prepareChunkRender()
    {
        if(this.mesh != null)
        {
            scene.remove(this.mesh);
        }

        //New version
        var geometry = new THREE.Geometry();

        var cX = this.chunkX * 16;
        var cZ = this.chunkZ * 16;
        for(var x = 0; x < 16; x++)
        {
            var rX = x + cX;
            for(var z = 0; z < 16; z++)
            {
                var rZ = z + cZ;
                for(var y = 0; y < this.maxHeight; y++)
                {
                    var tile = Tiles.getTile(this.getTileAt(x, y, z));
                    if(tile == null)
                    {
                        console.log(x, y, z);
                    }
                    if(tile.id != 0)
                    {
                        TileRenderer.renderTile(geometry, this, tile, x, y, z, rX, rZ);
                    }
                }
            }
        }

        this.mesh = new THREE.Mesh(geometry, Materials.toonMaterial);
        this.mesh.position.x = this.chunkX * 16;
        this.mesh.position.z = this.chunkZ * 16;
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        scene.add(this.mesh);
    }

    //Generate Chunk
    var length = this.map.length
    for(var i = 0; i < length; i++)
    {
        this.map[i] = 0;
    }

    for(var x = 0; x < 16; x++)
    {
        for(var z = 0; z < 16; z++)
        {
            var height = parseInt((noise.perlin2((this.chunkX * 16 + x) / 100, (this.chunkZ * 16 + z) / 100) + 1) * 10);
            this.maxHeight = Math.max(height, this.maxHeight);

            for(var y = 0; y < height; y++)
            {
                this.map[this.getIndexForCoords(x, y, z)] = 1;
            }
        }
    }
}
