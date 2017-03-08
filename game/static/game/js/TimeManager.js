function TimeManager()
{
    this.lastTime = null;
    this.currentFps = 0;
    this.totalFps = 0;
    this.fps = 0;
    this.delta = 0;
    this.tickTime = 0;

    this.calculateTime =
    function calculateTime(time)
    {
        var duration = this.lastTime == null ? 0 : time - this.lastTime;
        this.tickTime += duration;
        this.currentFps += duration;
        this.delta = this.tickTime / 50.0;
        this.totalFps++;
        if(this.currentFps >= 1000)
        {
            this.fps = this.totalFps;
            this.totalFps = 0;
            this.currentFps = 0;

            //console.log(this.fps + " FPS");
        }

        this.lastTime = time;
    }

    this.shallTick =
    function shallTick()
    {
        if(this.tickTime >= 50)
        {
            this.tickTime -= 50;
            this.delta = this.tickTime / 50.0;
            return true;
        }
        return false;
    }

    this.interpolate =
    function interpolate(prevX, x)
    {
        return (x - prevX) * this.delta + prevX;
    }
}

var TimeManager = new TimeManager();
