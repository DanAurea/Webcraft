//Cross browser compatibility
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Constants
var FOV = 45;
var VERSION = "0.1A";

//Properties
var width;
var height;
var textures;

//Three.js
var renderer;
var scene;
var camera;
var mesh;

var stats;

function initGame()
{
    stats = new Stats();
    stats.showPanel(0);
    $("body").append(stats.dom);

    //Init Properties
    width = window.innerWidth;
    height = window.innerHeight;

    GUIS.init();
    initFPSCamera();
    textures = ResourceLoader.initTextures();

    //Init renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    $("#gameContainer").append(renderer.domElement);

    //Init scene
    scene = new THREE.Scene();
    SkyRenderer.init();

    //Create camera (FOV, ratio, near, far)
    camera = new THREE.PerspectiveCamera(FOV, width / height, 1, 100000);
    camera.rotation.order = 'YXZ';
    camera.position.set(20, 30, 20);

    scene.add(camera);

    window.addEventListener( 'resize', onWindowResize, false );

    MapManager.initMap();
    MapManager.prepareMapRender();

    GUIS.INGAME_GUI.open();

    // on effectue le rendu de la scène
    requestAnimationFrame(loopGame);
}

function loopGame(time)
{
    stats.begin();

    TimeManager.calculateTime(time);

    camera.rotation.set(0, 0, 0);

    camera.rotation.x = toRadians(cameraPitch);
    camera.rotation.y = toRadians(cameraYaw);

    renderer.render(scene, camera);

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
}