var tileQueue = [];//Handle tile placed before player connected
var mapIsReady = false;

function MapManager()
{
    this.update =
    function update()
    {
        this.time++;
    }

    this.updateRender =
    function updateRender()
    {
        var loadedAmount = 0;
        for(var x = 0, length = this.chunks.length; x < length; x++)
        {
            var chunk = this.chunks[x];
            if(chunk.isDirty && loadedAmount < 3)
            {
                chunk.isDirty = false;
                chunk.prepareChunkRender();
                loadedAmount++;
            }
        }
    }

    this.initMap =
    function initMap(mapWidth, mapLength, time, dayDuration, seedColor)
    {
        console.log("Initializing map...");
        this.mapWidth = mapWidth;
        this.mapLength = mapLength;
        this.totalWidth = this.mapWidth * 16;
        this.totalLength = this.mapLength * 16;
        this.time = time;
        this.dayDuration = dayDuration;
        noise.seed(seedColor);

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

    this.getChunkAtChunkCoords =
    function getChunkAtChunkCoords(x, z)
    {
        if(x < 0 || z < 0 || x >= this.mapWidth || z >= this.mapLength)
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
            if(y >= 0 && y < chunkHeight)
            {
                return chunk.getTileAt(x % 16, y, z % 16);
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
            chunk.setTileAt(tile, x % 16, y, z % 16);
        }
    }

    this.applyQueue =
    function applyQueue()
    {
        for(var i = 0; i < tileQueue.length; i++)
        {
            var tile = tileQueue[i];
            this.setTileAt(tile.id, tile.x, tile.y, tile.z);
        }
        tileQueue = [];
        mapIsReady = true;
    }

    this.queueTile =
    function queueTile(x, y, z, tile)
    {
        tileQueue.push({"x": x, "y": y, "z": z, "id": tile})
    }
}

var MapManager = new MapManager();
