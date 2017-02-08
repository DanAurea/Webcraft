function Controls()
{
    this.controlMap = [];

    this.init =
    function init()
    {
        $(document).keydown(function(e)
        {
            for (var i = 0; i < Controls.controlMap.length; i++)
            {
                if(Controls.controlMap[i]["key"] == e.key)
                {
                    if(Controls.controlMap[i]["type"] == "press")
                    {
                        Controls.controlMap[i]["call"](e.key);
                    }

                    if(Controls.controlMap[i]["type"] != "release")
                    {
                        Controls.controlMap[i]["pressed"] = true;
                    }
                }
            }
        });

        $(document).keyup(function(e)
        {
            for (var i = 0; i < Controls.controlMap.length; i++)
            {
                if(Controls.controlMap[i]["key"] == e.key)
                {
                    if(Controls.controlMap[i]["type"] == "release")
                    {
                        Controls.controlMap[i]["call"](e.key);
                    }

                    if(Controls.controlMap[i]["type"] != "press")
                    {
                        Controls.controlMap[i]["pressed"] = false;
                    }
                }
            }
        });
    }

    this.update =
    function update()
    {
        for (var i = 0; i < this.controlMap.length; i++)
        {
            if(this.controlMap[i]["pressed"])
            {
                if(this.controlMap[i]["type"] == "hold")
                {
                    this.controlMap[i]["call"](this.controlMap[i]["key"]);
                }
            }
        }
    }

    this.register =
    function register(char, callback, type)
    {
    	this.controlMap.push({"key" : char, "call" : callback, "type" : type, "pressed" : false});
    }
}

var Controls = new Controls();
Controls.register("z", FPSCamera.move, "hold");
Controls.register("s", FPSCamera.move, "hold");
Controls.register("q", FPSCamera.move, "hold");
Controls.register("d", FPSCamera.move, "hold");
Controls.register(" ", FPSCamera.move, "hold");
Controls.register("Shift", FPSCamera.move, "hold");
