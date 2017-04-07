var gameFolder = "/static/game/";

//Debug mode
if(window.location.pathname.endsWith("debug.html"))
{
    gameFolder = "";
}

function ResourceLoader()
{
    var resources = [
        "img/palette.png",
        "models/apple.obj",
        "models/bear.obj",
        "models/beaver.obj",
        "models/boar.obj",
        "models/brown_mush.obj",
        "models/cactus.obj",
        "models/cat.obj",
        "models/cow.obj",
        "models/deadbush.obj",
        "models/dog.obj",
        "models/doge.obj",
        "models/elephant.obj",
        "models/flower_blue.obj",
        "models/flower_red.obj",
        "models/fox.obj",
        "models/grass.obj",
        "models/half.obj",
        "models/Jacobrownie.obj",
        "models/mammoth.obj",
        "models/panda.obj",
        "models/penguin.obj",
        "models/perry.obj",
        "models/pig.obj",
        "models/polar bear.obj",
        "models/racoon.obj",
        "models/red_mush.obj",
        "models/satan cow.obj",
        "models/satan sheep.obj",
        "models/sheep.obj",
        "models/tiger.obj",
        "models/white tiger.obj",
        "models/winter fox.obj",
        "models/window_x.obj",
        "models/window_z.obj",
        "models/grid_x.obj",
        "models/grid_z.obj",
        "models/chair.obj",
        "models/bottom_x.obj",
        "models/bottom_z.obj",
        "models/top_x.obj",
        "models/top_z.obj",
        "models/table.obj",
        "models/flower_pot.obj"
    ];
    for(var i = 0; i < resources.length; i++)
    {
        resources[i] = gameFolder + resources[i];
    }

    /*
    * Download all game assets required by the game in order to lauch
    * /!\ In case of an error, readyCallback will not be called
    * Params :
    *  readyCallback  : Callback(duration(ms)) used if all resources loaded successfully
    *  updateCallback : Callback(amountDownloaded, totalAmountToDownload) used on one file finished downloading
    *  errorCallback  : Callback(error) used if an error happen during download,
    */
    this.downloadGameResources =
    function downloadGameResources(readyCallback, updateCallback, errorCallback)
    {
        var resourceDownloaded = 0;
        var resourceAmount = resources.length;
        var beginTime = new Date().getTime();

        for(var i = 0; i < resourceAmount; i++)
        {
            var url = resources[i];
            $.get(url, function()
            {
                //Download finished
                updateCallback(++resourceDownloaded, resourceAmount);

                //All resources downloaded ?
                if(resourceDownloaded >= resourceAmount)
                {
                    var duration = new Date().getTime() - beginTime;
                    readyCallback(duration);
                }
            }).fail(errorCallback);
        }
    }

    /*
    * Convert downloaded image to
    * Return : Texture array
    */
    this.initTextures =
    function initTextures(finishCallback)
    {
        var textures = Array();
        var resourceAmount = resources.length;
        var imgAmount = 0;
        var loadedImgAmount = 0;

        //Count models
        for(var i = 0; i < resourceAmount; i++)
        {
            if(resources[i].endsWith(".png"))
            {
                imgAmount++;
            }
        }

        var textureLoader = new THREE.TextureLoader();
        for(var i = 0; i < resourceAmount; i++)
        {
            if(resources[i].endsWith(".png"))
            {
                var nameScheme = resources[i].split("/");
                var name = nameScheme[nameScheme.length - 1];
                name = name.substr(0, name.length - 4);
                textureLoader.load(resources[i], function(tex)
                {
                    tex.wrapS = THREE.RepeatWrapping;
                    tex.wrapT = THREE.RepeatWrapping;
                    textures[name] = tex;

                    loadedImgAmount++;
                    if(loadedImgAmount >= imgAmount)
                    {
                        finishCallback();
                    }
                });
            }
        }

        return textures;
    }

    this.initModels =
    function initModels(finishCallback)
    {
        var resourceAmount = resources.length;
        var modelAmount = 0;
        var loadedModelAmount = 0;

        //Count models
        for(var i = 0; i < resourceAmount; i++)
        {
            if(resources[i].endsWith(".obj"))
            {
                modelAmount++;
            }
        }

        for(var i = 0; i < resourceAmount; i++)
        {
            if(resources[i].endsWith(".obj"))
            {
                ModelLoader.loadModel(resources[i], function()
                {
                    loadedModelAmount++;

                    if(loadedModelAmount >= modelAmount)
                    {
                        finishCallback();
                    }
                });
            }
        }

    }


    this.ajaxGet =
    function ajaxGet(url, success, error)
    {
        $.get(url, success).fail(error);
    }

    this.loadMapInfo =
    function loadMapInfo(finishCallback, error)
    {
        if(!offlineMode)
        {
            $.get("/DRPG/game/getInfoMap", finishCallback).fail(error);
        }
        else
        {
            finishCallback({"size": 5, "timeDay": 600, "durationDay": 2400, "seedColor": 40000});
        }
    }

    this.loadChunkAt =
    function loadChunkAt(x, z, finishCallback, error)
    {
        if(!offlineMode)
        {
            $.get("/DRPG/game/getChunk", {"x": x, "z": z}, finishCallback).fail(error);
        }
        else
        {
            finishCallback({"x": x, "z": z, "tiles": MapManager.getChunkAtChunkCoords(x, z).map});
        }
    }

    // Uncompress chunk sent by server
    this.uncompress =
    function uncompress(chunk)
    {
        if(offlineMode)
        {
            return chunk;
        }

        var tiles = [];

        var i;
        var j;

        // RLE decompressing
        for (i=0; i< chunk.length; i++)
        {
            data  = chunk[i].split(":");

            // Decoding single / multiples values in sequences
            if(data.length == 1){
                tiles.push(data[0]);
            }else{
                count = parseInt(data[0]);
                value = parseInt(data[1]);

                for(j=0; j< count; j++){
                    tiles.push(value);
                }
            }

        }

        return tiles;
    }
}

var ResourceLoader = new ResourceLoader();
