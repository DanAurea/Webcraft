var mapWidth = 4;
var mapLength = 4;
var chunks;

function initMap()
{
    chunks = Array(mapWidth * mapLength);
    for(var x = 0; x < mapWidth; x++)
    {
        for(var z = 0; z < mapLength; z++)
        {
            chunks[x * mapWidth + z] = new Chunk(x, z);
        }
    }
}

function prepareMapRender()
{
    //Clear map
    scene.children.forEach(function(object)
    {
        scene.remove(object);
    });

    scene.add(camera);


    //var material = new THREE.MeshBasicMaterial({color: Math.random() * 0xFFFFFF});

    /*for(var x = 0; x < mapWidth; x++)
    {
        for(var y = 0; y < mapHeight; y++)
        {
            for(var z = 0; z < mapWidth; z++)
            {
                mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);
            }
        }
    }*/

    for(var x = 0; x < mapWidth; x++)
    {
        for(var z = 0; z < mapLength; z++)
        {
            getChunkAt(x, z).prepareRender();
        }
    }

    console.log("Map rendered");
}

function getChunkAt(x, z)
{
    if(x < 0 || z < 0 || x >= mapWidth || z >= mapLength)
    {
        return null;
    }

    return chunks[x * mapWidth + z];
}
