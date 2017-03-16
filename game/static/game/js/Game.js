//Cross browser compatibility
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Constants
var FOV = 45;
var VERSION = "0.1A";

//Properties
var width;
var height;
var textures;
var thePlayer;

//Three.js
var renderer;
var scene;
var camera;
var mesh;

var stats;

function initGame()
{
    window.addEventListener('resize', onWindowResize, false);

    stats = new Stats();
    stats.showPanel(0);
    $("body").append(stats.dom);

    //Init Properties
    width = window.innerWidth;
    height = window.innerHeight;

    textures = ResourceLoader.initTextures(function()
    {
        ResourceLoader.initModels(function()
        {
            Materials.init();
            GameRenderer.init();
            Controls.init();
            GUIS.init();

            ResourceLoader.loadMapInfo(function(data)
            {
                console.log(data);
                MapManager.initMap(data["size"], data["size"], data["timeDay"], data["durationDay"], data["seedColor"]);
                var chunkAmount = MapManager.mapWidth * MapManager.mapLength;
                var loadedChunk = 0;

                for(var x = 0; x < MapManager.mapWidth; x++)
                {
                    for(var z = 0; z < MapManager.mapLength; z++)
                    {
                        ResourceLoader.loadChunkAt(function(chunkData)
                        {
                            MapManager.getChunkAtChunkCoords(chunkData["x"], chunkData["z"]).map = chunkData["tiles"];
                            loadedChunk++;

                            if(loadedChunk >= chunkAmount)
                            {
                                MapManager.prepareMapRender();

                                GUIS.INGAME_GUI.open();
                                GUIS.CHAT_GUI.open();


                                thePlayer = new EntityPlayer();
                                thePlayer.setPosition(5, 15, 10);
                                thePlayer.spawn();

                                // On effectue le rendu de la scène
                                requestAnimationFrame(loopGame);
                            }
                        }, function(error)
                        {
                            alert("Erreur map ! Cf console");
                            console.error(error);
                        });
                    }
                }

            }, function(error)
            {
                alert("Erreur map ! Cf console");
                console.error(error);
            });
        });
    });
}

function loopGame(time)
{
    stats.begin();

    TimeManager.calculateTime(time);
    Controls.update();

    while(TimeManager.shallTick())
    {
        MapManager.update();
        Entities.updateEntities();
    }
    GameRenderer.update();

    GUIS.updateAllGuis();

    stats.end();
    requestAnimationFrame(loopGame);
}

function onWindowResize()
{
    width = window.innerWidth;
    height = window.innerHeight;

	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);

    GameRenderer.onResize();
}
