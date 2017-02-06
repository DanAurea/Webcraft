function Chunk(x, z)
{
    this.x = x;
    this.z = z;
    this.mesh = null;
    this.prepareRender = prepareChunkRender;
}

function prepareChunkRender()
{
    if(this.mesh != null)
    {
        scene.remove(this.mesh);
    }

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    for(var x = 0; x < 16; x++)
    {
        for(var z = 0; z < 16; z++)
        {
            var material = new THREE.MeshBasicMaterial({color: Math.random() * 0xFFFFFF});
            this.mesh = new THREE.Mesh(geometry, material);
            this.mesh.position.x = x + this.x * 16;
            this.mesh.position.z = z + this.z * 16;
            scene.add(this.mesh);
        }
    }
}

function getIndexForCoords(x, y, z)
{
    return x << 8 | y << 4 | z << 0;
}
