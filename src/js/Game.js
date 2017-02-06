//Cross browser compatibility
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

//Timing
var lastTime = null;
var currentFps = 0;
var totalFps = 0;
var fps = 0;

//Canvas
var jqCanvas;
var canvas;
var width = 640;
var height = 480;

function initGame()
{
    jqCanvas = $("#gameCanvas");
    canvas = jqCanvas[0];

    canvas.width = width;
    canvas.height = height;

    requestAnimationFrame(loopGame);
}

function loopGame(time)
{
    var delta = lastTime == null ? 0 : time - lastTime;
    currentFps += delta;
    totalFps++;
    if(currentFps >= 1000)
    {
        fps = totalFps;
        totalFps = 0;
        currentFps = 0;

        console.log(fps + " FPS");
    }

    requestAnimationFrame(loopGame);
    lastTime = time;
}
