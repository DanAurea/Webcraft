function TimeManager()
{
    this.lastTime = null;
    this.currentFps = 0;
    this.totalFps = 0;
    this.fps = 0;
    this.delta;

    this.calculateTime =
    function calculateTime(time)
    {
        this.delta = this.lastTime == null ? 0 : time - this.lastTime;
        this.currentFps += this.delta;
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
}

var TimeManager = new TimeManager();
