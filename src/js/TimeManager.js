//Timing
var lastTime = null;
var currentFps = 0;
var totalFps = 0;
var fps = 0;
var delta;

function calculateTime(time)
{
    delta = lastTime == null ? 0 : time - lastTime;
    currentFps += delta;
    totalFps++;
    if(currentFps >= 1000)
    {
        fps = totalFps;
        totalFps = 0;
        currentFps = 0;

        //console.log(fps + " FPS");
    }
}
