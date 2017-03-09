var dayDuration = 1000;
var offlineMode = true;

function MapManager()
{
    this.mapWidth = 2;
    this.mapLength = 2;
    this.totalWidth = this.mapWidth * 32;
    this.totalLength = this.mapLength * 32;
    this.chunks;
    this.time = 0;

    this.update =
    function update()
    {
        this.time++;
    }

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
        return this.getChunkAtChunkCoords(x >> 5, z >> 5);
    }

    this.getTileAt =
    function getTileAt(x, y, z)
    {
        var chunk = this.getChunkAt(x, z);
        if(chunk != null)
        {
            if(y >= 0 && y < chunkHeight)
            {
                return chunk.getTileAt(x % 32, y, z % 32);
            }
        }

        return 0;
    }

    this.setTileAt =
    function setTileAt(tile, x, y, z)
    {
        var chunk = this.getChunkAt(x, z);
        if(chunk != null)
        {
            chunk.setTileAt(tile, x % 32, y, z % 32);
        }
    }
}

var MapManager = new MapManager();
