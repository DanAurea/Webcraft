//Cross browser compatibility
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Constants
var FOV = 45;

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


    initFPSCamera();
    textures = initTextures();

    //Init renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    $("#gameContainer").append(renderer.domElement);

    //Init scene
    scene = new THREE.Scene();

    //Create camera (FOV, ratio, near, far)
    camera = new THREE.PerspectiveCamera(FOV, width / height, 1, 100000);
    camera.rotation.order = 'YXZ';
    camera.position.set(5, 3, 8);

    window.addEventListener( 'resize', onWindowResize, false );

    initMap();
    prepareMapRender();

    // on effectue le rendu de la scène
    requestAnimationFrame(loopGame);
}

function loopGame(time)
{
    stats.begin();

    calculateTime(time);

    camera.rotation.set(0, 0, 0);

    camera.rotation.x = toRadians(cameraPitch);
    camera.rotation.y = toRadians(cameraYaw);

    renderer.render(scene, camera);

    stats.end();

    lastTime = time;
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
