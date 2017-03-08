var gameFolder = "/static/game/";

//Debug mode
if(window.location.pathname.endsWith("debug.html"))
{
    gameFolder = "";
}

function ResourceLoader()
{
    var resources = ["img/palette.png", "models/flower_red.obj", "models/flower_blue.obj", "models/grass.obj"];
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
    function initTextures()
    {
        var textures = Array();
        var resourceAmount = resources.length;

        for(var i = 0; i < resourceAmount; i++)
        {
            if(resources[i].endsWith(".png"))
            {
                var nameScheme = resources[i].split("/");
                var name = nameScheme[nameScheme.length - 1];
                name = name.substr(0, name.length - 4);

                var tex = new THREE.TextureLoader().load(resources[i]);
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                textures[name] = tex;
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
}

var ResourceLoader = new ResourceLoader();
