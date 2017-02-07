var chunkHeight = 16;

var cubeVertices =
[
    ///Z-
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 1.0, 0.0,
    0.0, 1.0, 0.0,

    ///Z+
    0.0, 0.0, 1.0,
    1.0, 0.0, 1.0,
    1.0, 1.0, 1.0,
    0.0, 1.0, 1.0,

    ///X-
    0.0, 1.0, 1.0,
    0.0, 1.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 1.0,

    ///X+
    1.0, 1.0, 1.0,
    1.0, 1.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 1.0,

    ///Bottom
    0.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 1.0,
    0.0, 0.0, 1.0,

    ///Top
    0.0, 1.0, 0.0,
    1.0, 1.0, 0.0,
    1.0, 1.0, 1.0,
    0.0, 1.0, 1.0
];

function Chunk(x, z)
{
    this.x = x;
    this.z = z;
    this.mesh = null;
    this.map = Array(16 * chunkHeight * 16);
    for(var i = 0; i < this.map.length; i++)
    {
        this.map[i] = Math.random() < 0.01 ? 1 : 0;
    }

    function setTileAt(tile, x, y, z)
    {
        if(x < 0 || y < 0 || z < 0 || x > 15 || y >= chunkHeight || z > 15)
        {
            return;
        }

        this.map[getIndexForCoords(x, y, z)] = tile;

        this.prepareChunkRender();
        //TODO update neighbours
    }

    function getTileAt(x, y, z)
    {
        if(x < 0 || y < 0 || z < 0 || x > 15 || y >= chunkHeight || z > 15)
        {
            return 0;
        }

        return this.map[getIndexForCoords(x, y, z)];
    }

    function getIndexForCoords(x, y, z)
    {
        return x << 8 | y << 4 | z << 0;
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
        var geometry = new THREE.Geometry();
        //var material = new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors});
        var material = new THREE.MeshBasicMaterial({color: Math.random() * 0xFFFFFF});

        var vertexAmount = 0;
        for(var x = 0; x < 16; x++)
        {
            for(var y = 0; y < chunkHeight; y++)
            {
                for(var z = 0; z < 16; z++)
                {
                    var tile = this.getTileAt(x, y, z);
                    if(tile != 0)
                    {
                        //Z-
    					geometry.vertices.push(new THREE.Vector3(cubeVertices[0] + x, cubeVertices[1] + y, cubeVertices[2] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[3] + x, cubeVertices[4] + y, cubeVertices[5] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[6] + x, cubeVertices[7] + y, cubeVertices[8] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[9] + x, cubeVertices[10] + y, cubeVertices[11] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount));
                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2));

                        vertexAmount = geometry.vertices.length;

                        //Z+
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[12] + x, cubeVertices[13] + y, cubeVertices[14] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[15] + x, cubeVertices[16] + y, cubeVertices[17] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[18] + x, cubeVertices[19] + y, cubeVertices[20] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[21] + x, cubeVertices[22] + y, cubeVertices[23] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2));
                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount));

                        vertexAmount = geometry.vertices.length;

                        //X-
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[24] + x, cubeVertices[25] + y, cubeVertices[26] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[27] + x, cubeVertices[28] + y, cubeVertices[29] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[30] + x, cubeVertices[31] + y, cubeVertices[32] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[33] + x, cubeVertices[34] + y, cubeVertices[35] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2));
                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount));

                        vertexAmount = geometry.vertices.length;

                        //X+
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[36] + x, cubeVertices[37] + y, cubeVertices[38] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[39] + x, cubeVertices[40] + y, cubeVertices[41] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[42] + x, cubeVertices[43] + y, cubeVertices[44] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[45] + x, cubeVertices[46] + y, cubeVertices[47] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount));
                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2));

                        vertexAmount = geometry.vertices.length;

                        //Bottom
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[48] + x, cubeVertices[49] + y, cubeVertices[50] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[51] + x, cubeVertices[52] + y, cubeVertices[53] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[54] + x, cubeVertices[55] + y, cubeVertices[56] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[57] + x, cubeVertices[58] + y, cubeVertices[59] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2));
                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount));

                        vertexAmount = geometry.vertices.length;

                        //Top
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[60] + x, cubeVertices[61] + y, cubeVertices[62] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[63] + x, cubeVertices[64] + y, cubeVertices[65] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[66] + x, cubeVertices[67] + y, cubeVertices[68] + z));
                        geometry.vertices.push(new THREE.Vector3(cubeVertices[69] + x, cubeVertices[70] + y, cubeVertices[71] + z));

                        geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount));
                        geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2));

                        vertexAmount = geometry.vertices.length;
                    }
                }
            }
        }

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = this.x * 16;
        this.mesh.position.z = this.z * 16;
        scene.add(this.mesh);
    }

    this.prepareChunkRender = prepareChunkRender;
    this.getTileAt = getTileAt;
    this.setTileAt = setTileAt;
}
