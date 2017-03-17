function Controls()
{
    this.controlMap = [];

    this.init =
    function init()
    {
        $(document).keydown(function(e)
        {
            if(FPSCamera.locked)
            {
                e.key = e.key.toLowerCase();

                for (var i = 0; i < Controls.controlMap.length; i++)
                {
                    if(Controls.controlMap[i]["key"] == e.key)
                    {
                        if(Controls.controlMap[i]["type"] == "press")
                        {
                            Controls.controlMap[i]["call"](e.key, e);
                        }

                        if(Controls.controlMap[i]["type"] != "release")
                        {
                            Controls.controlMap[i]["pressed"] = true;
                        }
                    }
                }
            }
        });

        $(document).keyup(function(e)
        {
            if(FPSCamera.locked)
            {
                e.key = e.key.toLowerCase();

                for (var i = 0; i < Controls.controlMap.length; i++)
                {
                    if(Controls.controlMap[i]["key"] == e.key)
                    {
                        if(Controls.controlMap[i]["type"] == "release")
                        {
                            Controls.controlMap[i]["call"](e.key, e);
                        }

                        if(Controls.controlMap[i]["type"] != "press")
                        {
                            Controls.controlMap[i]["pressed"] = false;
                        }
                    }
                }
            }
        });

        $(document).mousedown(function(e)
        {
            if(FPSCamera.locked)
            {
                var key = "mouse-" + e.button;

                for (var i = 0; i < Controls.controlMap.length; i++)
                {
                    if(Controls.controlMap[i]["key"] == key)
                    {
                        if(Controls.controlMap[i]["type"] == "press")
                        {
                            Controls.controlMap[i]["call"](key, e);
                        }

                        if(Controls.controlMap[i]["type"] != "release")
                        {
                            Controls.controlMap[i]["pressed"] = true;
                        }
                    }
                }
            }
        });

        $(document).mouseup(function(e)
        {
            if(FPSCamera.locked)
            {
                var key = "mouse-" + e.button;

                for (var i = 0; i < Controls.controlMap.length; i++)
                {
                    if(Controls.controlMap[i]["key"] == key)
                    {
                        if(Controls.controlMap[i]["type"] == "release")
                        {
                            Controls.controlMap[i]["call"](key, e);
                        }

                        if(Controls.controlMap[i]["type"] != "press")
                        {
                            Controls.controlMap[i]["pressed"] = true;
                        }
                    }
                }
            }
        });

        $(document).unbind('mousewheel');
        $(document).bind("mousewheel", function(e)
        {
            if(FPSCamera.locked)
            {
                for (var i = 0; i < Controls.controlMap.length; i++)
                {
                    if(Controls.controlMap[i]["key"] == "mousewheel")
                    {
                        Controls.controlMap[i]["call"]((e.originalEvent.wheelDelta / 120 > 0 ? -1 : 1), e);
                    }
                }
            }
        });
    }

    this.update =
    function update()
    {
        if(FPSCamera.locked)
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
//Controls.register("arrowup", FPSCamera.chooseTile, "press");
//Controls.register("arrowdown", FPSCamera.chooseTile, "press");
Controls.register("shift", FPSCamera.move, "hold");
Controls.register("mouse-0", FPSCamera.placeTile, "press");
Controls.register("mouse-2", FPSCamera.placeTile, "press");
Controls.register("mousewheel", FPSCamera.chooseTile, "wheel");
Controls.register("t", activeChat, "press");
