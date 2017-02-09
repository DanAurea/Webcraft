function MapManager()
{
    this.mapWidth = 16;
    this.mapLength = 16;
    this.totalWidth = this.mapWidth * 16;
    this.totalLength = this.mapLength * 16;
    this.chunks;

    this.initMap =
    function initMap()
    {
        console.log("Initializing map...");
        noise.seed(Math.random());

        this.chunks = Array(this.mapWidth * this.mapLength);
        for(var x = 0; x < this.mapWidth; x++)
        {
            for(var z = 0; z < this.mapLength; z++)
            {
                this.chunks[x * this.mapWidth + z] = new Chunk(x, z);
            }
        }
        console.log("Initialized map...");
    }

    this.prepareMapRender =
    function prepareMapRender()
    {
        console.log("Rendering map...");

        //Clear map
        for(var i = 0; i < this.chunks.length; i++)
        {
            if(this.chunks[i].mesh != null)
            {
                scene.remove(this.chunks[i].mesh);
            }
        }

        var begin = new Date().getTime();
        for(var i = 0, chunkAmount = this.chunks.length; i < chunkAmount; i++)
        {
            this.chunks[i].prepareChunkRender();
        }

        console.log("Map rendered in " + (new Date().getTime() - begin) + "ms");
    }

    this.getChunkAtChunkCoords =
    function getChunkAtChunkCoords(x, z)
    {
        if(x < 0 || z < 0 || x >= this.totalWidth || z >= this.totalLength)
        {
            return null;
        }

        return this.chunks[x * this.mapWidth + z];
    }

    this.getChunkAt =
    function getChunkAt(x, z)
    {
        return this.getChunkAtChunkCoords(x >> 4, z >> 4);
    }

    this.getTileAt =
    function getTileAt(x, y, z)
    {
        var chunk = this.getChunkAt(x, z);
        if(chunk != null)
        {
            return chunk.getTileAt(x % 16, y, z % 16);
        }

        return 0;
    }

    this.setTileAt =
    function setTileAt(tile, x, y, z)
    {
        var chunk = this.getChunkAt(x, z);
        if(chunk != null)
        {
            chunk.setTileAt(tile, x % 16, y, z % 16);
        }
    }
}

var MapManager = new MapManager();
