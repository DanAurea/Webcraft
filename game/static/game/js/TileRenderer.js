function TileRenderer()
{
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

    var cubeNormals =
    [
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 1, 0)
    ];

    this.renderTile =
    function renderTile(geometry, chunk, tile, x, y, z, rX, rZ)
    {
        var vertexAmount = geometry.vertices.length;
        var tileColor = null;

        //Z-
        if(rZ > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z - 1))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[0] + x, cubeVertices[1] + y, cubeVertices[2] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[3] + x, cubeVertices[4] + y, cubeVertices[5] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[6] + x, cubeVertices[7] + y, cubeVertices[8] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[9] + x, cubeVertices[10] + y, cubeVertices[11] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount, cubeNormals[0], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2, cubeNormals[0], tileColor));

            vertexAmount = geometry.vertices.length;
        }

        //Z+
        if(rZ < MapManager.totalLength - 1 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z + 1))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[12] + x, cubeVertices[13] + y, cubeVertices[14] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[15] + x, cubeVertices[16] + y, cubeVertices[17] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[18] + x, cubeVertices[19] + y, cubeVertices[20] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[21] + x, cubeVertices[22] + y, cubeVertices[23] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2, cubeNormals[1], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount, cubeNormals[1], tileColor));

            vertexAmount = geometry.vertices.length;
        }

        //X-
        if(rX > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x - 1, y, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[24] + x, cubeVertices[25] + y, cubeVertices[26] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[27] + x, cubeVertices[28] + y, cubeVertices[29] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[30] + x, cubeVertices[31] + y, cubeVertices[32] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[33] + x, cubeVertices[34] + y, cubeVertices[35] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2, cubeNormals[2], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount, cubeNormals[2], tileColor));

            vertexAmount = geometry.vertices.length;
        }

        //X+
        if(rX < MapManager.totalWidth - 1 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x + 1, y, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[36] + x, cubeVertices[37] + y, cubeVertices[38] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[39] + x, cubeVertices[40] + y, cubeVertices[41] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[42] + x, cubeVertices[43] + y, cubeVertices[44] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[45] + x, cubeVertices[46] + y, cubeVertices[47] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount, cubeNormals[3], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2, cubeNormals[3], tileColor));

            vertexAmount = geometry.vertices.length;
        }

        //Bottom
        if(y > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileAt(x, y - 1, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[48] + x, cubeVertices[49] + y, cubeVertices[50] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[51] + x, cubeVertices[52] + y, cubeVertices[53] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[54] + x, cubeVertices[55] + y, cubeVertices[56] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[57] + x, cubeVertices[58] + y, cubeVertices[59] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 1, vertexAmount + 2, cubeNormals[4], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 3, vertexAmount, cubeNormals[4], tileColor));

            vertexAmount = geometry.vertices.length;
        }

        //Top
        if(tile.isSideVisible(Tiles.getTile(chunk.getTileAt(x, y + 1, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            geometry.vertices[vertexAmount] = (new THREE.Vector3(cubeVertices[60] + x, cubeVertices[61] + y, cubeVertices[62] + z));
            geometry.vertices[vertexAmount + 1] = (new THREE.Vector3(cubeVertices[63] + x, cubeVertices[64] + y, cubeVertices[65] + z));
            geometry.vertices[vertexAmount + 2] = (new THREE.Vector3(cubeVertices[66] + x, cubeVertices[67] + y, cubeVertices[68] + z));
            geometry.vertices[vertexAmount + 3] = (new THREE.Vector3(cubeVertices[69] + x, cubeVertices[70] + y, cubeVertices[71] + z));

            geometry.faces.push(new THREE.Face3(vertexAmount + 2, vertexAmount + 1, vertexAmount, cubeNormals[5], tileColor));
            geometry.faces.push(new THREE.Face3(vertexAmount, vertexAmount + 3, vertexAmount + 2, cubeNormals[5], tileColor));

            vertexAmount = geometry.vertices.length;
        }
    }

    this.initTileColor =
    function initTileColor(rX, rZ, tile)
    {
        var tileColor = new THREE.Color(tile.color);
        if(tile.colorChange)
        {
            tileColor.r += noise.simplex2((rX - 10000) / 100, (rZ - 10000) / 100) * tile.redVariant;
            tileColor.g += noise.simplex2((rX - 10000) / 100, (rZ - 10000) / 100) * tile.greenVariant;
            tileColor.b += noise.simplex2((rX - 10000) / 100, (rZ + 10000) / 100) * tile.blueVariant;
        }

        return tileColor;
    }
}

var TileRenderer = new TileRenderer();
