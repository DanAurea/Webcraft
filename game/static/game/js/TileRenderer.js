function TileRenderer()
{
    var cubeVertices =
    [
        ///Z-
        1.0, 0.0, 0.0,
        0.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        ///Z+
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0,
        0.0, 1.0, 1.0,
        1.0, 1.0, 1.0,

        ///X-
        0.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 1.0,

        ///X+
        1.0, 0.0, 0.0,
        1.0, 1.0, 0.0,
        1.0, 0.0, 1.0,
        1.0, 1.0, 1.0,

        ///Bottom
        0.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        0.0, 0.0, 1.0,
        1.0, 0.0, 1.0,

        ///Top
        0.0, 1.0, 0.0,
        0.0, 1.0, 1.0,
        1.0, 1.0, 0.0,
        1.0, 1.0, 1.0
    ];

    //Useless for now
    /*var cubeNormals =
    [
        new THREE.Vector3(0, 0, -1),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 1, 0)
    ];*/

    this.renderTile =
    function renderTile(tilePositions, tileColors, tileNormals, chunk, tile, x, y, z, rX, rZ)
    {
        var tileColor = null;

        //Top
        if(tile.isSideVisible(Tiles.getTile(chunk.getTileAt(x, y + 1, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[60] + x, cubeVertices[61] * tile.height + y, cubeVertices[62] + z);
            tilePositions.push(cubeVertices[63] + x, cubeVertices[64] * tile.height + y, cubeVertices[65] + z);
            tilePositions.push(cubeVertices[66] + x, cubeVertices[67] * tile.height + y, cubeVertices[68] + z);

            tilePositions.push(cubeVertices[66] + x, cubeVertices[67] * tile.height + y, cubeVertices[68] + z);
            tilePositions.push(cubeVertices[63] + x, cubeVertices[64] * tile.height + y, cubeVertices[65] + z);
            tilePositions.push(cubeVertices[69] + x, cubeVertices[70] * tile.height + y, cubeVertices[71] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }

        //Bottom
        if(y > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileAt(x, y - 1, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[48] + x, cubeVertices[49] + y, cubeVertices[50] + z);
            tilePositions.push(cubeVertices[51] + x, cubeVertices[52] + y, cubeVertices[53] + z);
            tilePositions.push(cubeVertices[54] + x, cubeVertices[55] + y, cubeVertices[56] + z);

            tilePositions.push(cubeVertices[54] + x, cubeVertices[55] + y, cubeVertices[56] + z);
            tilePositions.push(cubeVertices[51] + x, cubeVertices[52] + y, cubeVertices[53] + z);
            tilePositions.push(cubeVertices[57] + x, cubeVertices[58] + y, cubeVertices[69] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }

        //X-
        if(rX > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x - 1, y, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[24] + x, cubeVertices[25] * tile.height + y, cubeVertices[26] + z);
            tilePositions.push(cubeVertices[27] + x, cubeVertices[28] * tile.height + y, cubeVertices[29] + z);
            tilePositions.push(cubeVertices[30] + x, cubeVertices[31] * tile.height + y, cubeVertices[32] + z);

            tilePositions.push(cubeVertices[30] + x, cubeVertices[31] * tile.height + y, cubeVertices[32] + z);
            tilePositions.push(cubeVertices[27] + x, cubeVertices[28] * tile.height + y, cubeVertices[29] + z);
            tilePositions.push(cubeVertices[33] + x, cubeVertices[34] * tile.height + y, cubeVertices[35] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }

        //X+
        if(rX < MapManager.totalWidth - 1 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x + 1, y, z))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[36] + x, cubeVertices[37] * tile.height + y, cubeVertices[38] + z);
            tilePositions.push(cubeVertices[39] + x, cubeVertices[40] * tile.height + y, cubeVertices[41] + z);
            tilePositions.push(cubeVertices[42] + x, cubeVertices[43] * tile.height + y, cubeVertices[44] + z);

            tilePositions.push(cubeVertices[42] + x, cubeVertices[43] * tile.height + y, cubeVertices[44] + z);
            tilePositions.push(cubeVertices[39] + x, cubeVertices[40] * tile.height + y, cubeVertices[41] + z);
            tilePositions.push(cubeVertices[45] + x, cubeVertices[46] * tile.height + y, cubeVertices[47] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }

        //Z-
        if(rZ > 0 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z - 1))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[0] + x, cubeVertices[1] * tile.height + y, cubeVertices[2] + z);
            tilePositions.push(cubeVertices[3] + x, cubeVertices[4] * tile.height + y, cubeVertices[5] + z);
            tilePositions.push(cubeVertices[6] + x, cubeVertices[7] * tile.height + y, cubeVertices[8] + z);

            tilePositions.push(cubeVertices[6] + x, cubeVertices[7] * tile.height + y, cubeVertices[8] + z);
            tilePositions.push(cubeVertices[3] + x, cubeVertices[4] * tile.height + y, cubeVertices[5] + z);
            tilePositions.push(cubeVertices[9] + x, cubeVertices[10] * tile.height + y, cubeVertices[11] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }

        //Z+
        if(rZ < MapManager.totalLength - 1 && tile.isSideVisible(Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z + 1))))
        {
            if(tileColor == null)
            {
                tileColor = this.initTileColor(rX, rZ, tile);
            }

            tilePositions.push(cubeVertices[12] + x, cubeVertices[13] * tile.height + y, cubeVertices[14] + z);
            tilePositions.push(cubeVertices[15] + x, cubeVertices[16] * tile.height + y, cubeVertices[17] + z);
            tilePositions.push(cubeVertices[18] + x, cubeVertices[19] * tile.height + y, cubeVertices[20] + z);

            tilePositions.push(cubeVertices[18] + x, cubeVertices[19] * tile.height + y, cubeVertices[20] + z);
            tilePositions.push(cubeVertices[15] + x, cubeVertices[16] * tile.height + y, cubeVertices[17] + z);
            tilePositions.push(cubeVertices[21] + x, cubeVertices[22] * tile.height + y, cubeVertices[23] + z);

            tileColors.push(tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b,
                            tileColor.r, tileColor.g, tileColor.b);
        }
    }

    this.initTileColor =
    function initTileColor(rX, rZ, tile)
    {
        var tileColor = new THREE.Color(tile.color);
        if(tile.colorChange)
        {
            var cX = (rX - 10000) / 50;
            var cZ = (rZ - 10000) / 50;
            tileColor.r += noise.simplex2(cX, cZ) * tile.redVariant;
            tileColor.g += noise.simplex2(cX, cZ) * tile.greenVariant;
            tileColor.b += noise.simplex2(cX, cZ) * tile.blueVariant;
        }

        return tileColor;
    }

    this.renderModel =
    function renderModel(positions, normals, uvs, chunk, tile, x, y, z)
    {
        var model = ModelLoader.models[tile.model].children[0].geometry.attributes;
        var vertices = model.position.array;
        var modelNormals = model.normal.array;
        var modelUVs = model.uv.array;

        //Vertices
        for(var i = 0, length = vertices.length; i < length; i+=3)
        {
            positions.push(vertices[i] + x, vertices[i + 1] + y, vertices[i + 2] + z);
        }

        //Normals
        for(var i = 0, length = modelNormals.length; i < length; i++)
        {
            normals.push(modelNormals[i]);
        }

        //UV
        for(var i = 0, length = modelUVs.length; i < length; i++)
        {
            uvs.push(modelUVs[i]);
        }
    }
}

var TileRenderer = new TileRenderer();
