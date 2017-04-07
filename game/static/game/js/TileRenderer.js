function TileRenderer()
{
    /*var cubeVertices =
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
    ];*/

    var cubeNormals =
    [
        0, 0, -1,
        0, 0, 1,
        -1, 0, 0,
        1, 0, 0,
        0, -1, 0,
        0, 1, 0
    ];

    var lastColor = 0;
    var red = 0;
    var green = 0;
    var blue = 0;

    this.renderTile =
    function renderTile(tilePositions, tileColors, tileNormals, chunk, tile, x, y, z, rX, rZ)
    {
        //Top
        if(y > 254 || tile.isSideVisible(0, Tiles.getTile(chunk.getTileAt(x, y + 1, z))))
        {
            this.initTileColor(rX, rZ, tile);

            var top = tile.normalizedRenderBox.y2 + y;
            var rX1 = tile.normalizedRenderBox.x + x;
            var rX2 = tile.normalizedRenderBox.x2 + x;
            var rZ1 = tile.normalizedRenderBox.z + z;
            var rZ2 = tile.normalizedRenderBox.z2 + z;
            tilePositions.push(rX1, top, rZ1);
            tilePositions.push(rX1, top, rZ2);
            tilePositions.push(rX2, top, rZ1);

            tilePositions.push(rX2, top, rZ1);
            tilePositions.push(rX1, top, rZ2);
            tilePositions.push(rX2, top, rZ2);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[15], cubeNormals[17], cubeNormals[18],
                             cubeNormals[15], cubeNormals[17], cubeNormals[18],
                             cubeNormals[15], cubeNormals[17], cubeNormals[18],
                             cubeNormals[15], cubeNormals[17], cubeNormals[18],
                             cubeNormals[15], cubeNormals[17], cubeNormals[18],
                             cubeNormals[15], cubeNormals[17], cubeNormals[18]);
        }

        //Bottom
        if(y > 0 && tile.isSideVisible(1, Tiles.getTile(chunk.getTileAt(x, y - 1, z))))
        {
            this.initTileColor(rX, rZ, tile);

            var bottom = tile.normalizedRenderBox.y + y;
            var rX1 = tile.normalizedRenderBox.x + x;
            var rX2 = tile.normalizedRenderBox.x2 + x;
            var rZ1 = tile.normalizedRenderBox.z + z;
            var rZ2 = tile.normalizedRenderBox.z2 + z;
            tilePositions.push(rX1, bottom, rZ1);
            tilePositions.push(rX2, bottom, rZ1);
            tilePositions.push(rX1, bottom, rZ2);

            tilePositions.push(rX1, bottom, rZ2);
            tilePositions.push(rX2, bottom, rZ1);
            tilePositions.push(rX2, bottom, rZ2);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[12], cubeNormals[13], cubeNormals[14],
                             cubeNormals[12], cubeNormals[13], cubeNormals[14],
                             cubeNormals[12], cubeNormals[13], cubeNormals[14],
                             cubeNormals[12], cubeNormals[13], cubeNormals[14],
                             cubeNormals[12], cubeNormals[13], cubeNormals[14],
                             cubeNormals[12], cubeNormals[13], cubeNormals[14]);
        }

        //X-
        if(rX > 0 && tile.isSideVisible(2, Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x - 1, y, z))))
        {
            this.initTileColor(rX, rZ, tile);

            var top = tile.normalizedRenderBox.y2 + y;
            var bottom = tile.normalizedRenderBox.y + y;
            var rX1 = tile.normalizedRenderBox.x + x;
            var rZ1 = tile.normalizedRenderBox.z + z;
            var rZ2 = tile.normalizedRenderBox.z2 + z;
            tilePositions.push(rX1, bottom, rZ1);
            tilePositions.push(rX1, bottom, rZ2);
            tilePositions.push(rX1, top, rZ1);

            tilePositions.push(rX1, top, rZ1);
            tilePositions.push(rX1, bottom, rZ2);
            tilePositions.push(rX1, top, rZ2);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[6], cubeNormals[7], cubeNormals[8],
                             cubeNormals[6], cubeNormals[7], cubeNormals[8],
                             cubeNormals[6], cubeNormals[7], cubeNormals[8],
                             cubeNormals[6], cubeNormals[7], cubeNormals[8],
                             cubeNormals[6], cubeNormals[7], cubeNormals[8],
                             cubeNormals[6], cubeNormals[7], cubeNormals[8]);
        }

        //X+
        if(rX < MapManager.totalWidth - 1 && tile.isSideVisible(3, Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x + 1, y, z))))
        {
            this.initTileColor(rX, rZ, tile);

            var top = tile.normalizedRenderBox.y2 + y;
            var bottom = tile.normalizedRenderBox.y + y;
            var rX2 = tile.normalizedRenderBox.x2 + x;
            var rZ1 = tile.normalizedRenderBox.z + z;
            var rZ2 = tile.normalizedRenderBox.z2 + z;
            tilePositions.push(rX2, bottom, rZ1);
            tilePositions.push(rX2, top, rZ1);
            tilePositions.push(rX2, bottom, rZ2);

            tilePositions.push(rX2, bottom, rZ2);
            tilePositions.push(rX2, top, rZ1);
            tilePositions.push(rX2, top, rZ2);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[9], cubeNormals[10], cubeNormals[11],
                             cubeNormals[9], cubeNormals[10], cubeNormals[11],
                             cubeNormals[9], cubeNormals[10], cubeNormals[11],
                             cubeNormals[9], cubeNormals[10], cubeNormals[11],
                             cubeNormals[9], cubeNormals[10], cubeNormals[11],
                             cubeNormals[9], cubeNormals[10], cubeNormals[11]);
        }

        //Z-
        if(rZ > 0 && tile.isSideVisible(4, Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z - 1))))
        {
            this.initTileColor(rX, rZ, tile);

            var top = tile.normalizedRenderBox.y2 + y;
            var bottom = tile.normalizedRenderBox.y + y;
            var rX1 = tile.normalizedRenderBox.x + x;
            var rX2 = tile.normalizedRenderBox.x2 + x;
            var rZ1 = tile.normalizedRenderBox.z + z;
            tilePositions.push(rX2, bottom, rZ1);
            tilePositions.push(rX1, bottom, rZ1);
            tilePositions.push(rX2, top, rZ1);

            tilePositions.push(rX2, top, rZ1);
            tilePositions.push(rX1, bottom, rZ1);
            tilePositions.push(rX1, top, rZ1);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[0], cubeNormals[1], cubeNormals[2],
                             cubeNormals[0], cubeNormals[1], cubeNormals[2],
                             cubeNormals[0], cubeNormals[1], cubeNormals[2],
                             cubeNormals[0], cubeNormals[1], cubeNormals[2],
                             cubeNormals[0], cubeNormals[1], cubeNormals[2],
                             cubeNormals[0], cubeNormals[1], cubeNormals[2]);
        }

        //Z+
        if(rZ < MapManager.totalLength - 1 && tile.isSideVisible(5, Tiles.getTile(chunk.getTileWithNeighbourChunkAt(x, y, z + 1))))
        {
            this.initTileColor(rX, rZ, tile);

            var top = tile.normalizedRenderBox.y2 + y;
            var bottom = tile.normalizedRenderBox.y + y;
            var rX1 = tile.normalizedRenderBox.x + x;
            var rX2 = tile.normalizedRenderBox.x2 + x;
            var rZ2 = tile.normalizedRenderBox.z2 + z;
            tilePositions.push(rX1, bottom, rZ2);
            tilePositions.push(rX2, bottom, rZ2);
            tilePositions.push(rX1, top, rZ2);

            tilePositions.push(rX1, top, rZ2);
            tilePositions.push(rX2, bottom, rZ2);
            tilePositions.push(rX2, top, rZ2);

            tileColors.push(red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue,
                            red, green, blue);

            tileNormals.push(cubeNormals[3], cubeNormals[4], cubeNormals[5],
                             cubeNormals[3], cubeNormals[4], cubeNormals[5],
                             cubeNormals[3], cubeNormals[4], cubeNormals[5],
                             cubeNormals[3], cubeNormals[4], cubeNormals[5],
                             cubeNormals[3], cubeNormals[4], cubeNormals[5],
                             cubeNormals[3], cubeNormals[4], cubeNormals[5]);
        }
    }

    this.initTileColor =
    function initTileColor(rX, rZ, tile)
    {
        if(tile.renderId() == 2)
        {
            var change = noise.simplex2((rX - 10000) / 50, (rZ - 10000) / 50);
            red = Math.max(0.0, Math.min(tile.red + change * tile.redVariant, 1.0));
            green = Math.max(0.0, Math.min(tile.green + change * tile.greenVariant, 1.0));
            blue = Math.max(0.0, Math.min(tile.blue + change * tile.blueVariant, 1.0));
            lastColor = tile.color;
        }
        else if(tile.color != lastColor)
        {
            lastColor = tile.color;
            red = tile.red;
            green = tile.green;
            blue = tile.blue;
        }
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
        for(var i = 0, length = modelNormals.length; i < length; i+=3)
        {
            normals.push(modelNormals[i],modelNormals[i + 1],modelNormals[i + 2]);
        }

        //UV
        for(var i = 0, length = modelUVs.length; i < length; i+=2)
        {
            uvs.push(modelUVs[i], modelUVs[i+1]);
        }
    }
}

var TileRenderer = new TileRenderer();
