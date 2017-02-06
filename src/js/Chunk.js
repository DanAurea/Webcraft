var chunkHeight = 16;

function Chunk(x, z)
{
    this.x = x;
    this.z = z;
    this.mesh = null;
    this.prepareRender = prepareChunkRender;
    this.getTileAt = getTileAt;
    this.map = Array(16 * chunkHeight * 16);
    for(var i = 0; i < this.map.length; i++)
    {
        this.map[i] = Math.random() < 0.01 ? 1 : 0;
    }
}

function prepareChunkRender()
{
    if(this.mesh != null)
    {
        scene.remove(this.mesh);
    }

    //Old version
    /*var geometry = new THREE.CubeGeometry(1, 1, 1);
    for(var x = 0; x < 16; x++)
    {
        for(var y = 0; y < chunkHeight; y++)
        {
            for(var z = 0; z < 16; z++)
            {
                var tile = this.getTileAt(x, y, z);
                if(tile != 0)
                {
                    var material = new THREE.MeshBasicMaterial({color: Math.random() * 0xFFFFFF});
                    this.mesh = new THREE.Mesh(geometry, material);
                    this.mesh.position.x = x + this.x * 16;
                    this.mesh.position.y = y;
                    this.mesh.position.z = z + this.z * 16;
                    scene.add(this.mesh);
                }
            }
        }
    }*/

    //New version
    var geometry = new THREE.Geometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});

    for(var x = 0; x < 16; x++)
    {
        for(var y = 0; y < chunkHeight; y++)
        {
            for(var z = 0; z < 16; z++)
            {
                var tile = this.getTileAt(x, y, z);
                if(tile != 0)
                {
                    //TODO Add vertices & colors
                }
            }
        }
    }

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.x = this.x * 16;
    this.mesh.position.z = this.z * 16;
    scene.add(this.mesh);
}

function getIndexForCoords(x, y, z)
{
    return x << 8 | y << 4 | z << 0;
}

function getTileAt(x, y, z)
{
    if(x < 0 || y < 0 || z < 0 || x > 15 || y >= chunkHeight || z > 15)
    {
        return 0;
    }

    return this.map[getIndexForCoords(x, y, z)];
}
