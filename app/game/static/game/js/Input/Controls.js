function Controls()
{
    this.controlMap = [];
    this.wheelTimeout = 0;
    this.wheelEvent = 0;

    this.registerControls =
    function registerControls()
    {
        Controls.register("z", FPSCamera.move, "hold", true);
        Controls.register("s", FPSCamera.move, "hold", true);
        Controls.register("q", FPSCamera.move, "hold", true);
        Controls.register("d", FPSCamera.move, "hold", true);
        Controls.register(" ", FPSCamera.fly, "hold", true);
        Controls.register("shift", FPSCamera.fly, "hold", true);
        Controls.register("mouse-0", FPSCamera.placeTile, "press", true);
        Controls.register("mouse-1", FPSCamera.pickTile, "press", true);
        Controls.register("mouse-2", FPSCamera.placeTile, "press", true);
        Controls.register("mousewheel", FPSCamera.chooseTile, "wheel", true);
        Controls.register("t", ChatManager.toggleChat, "press", true);
        Controls.register("escape", ChatManager.toggleChat, "press", false);
        Controls.register("escape", GUIS.escapePressed, "press", false);
        Controls.register("control", FPSCamera.zoom, "press", true);
        Controls.register("control", FPSCamera.unZoom, "release", true);

        Controls.register("tab", function(key, ev){GUIS.PLAYER_LIST.open();}, "press", true);
        Controls.register("tab", function(key, ev){GUIS.PLAYER_LIST.close();}, "release", true);

        Controls.register("f3", function(key, ev){GUIS.DEBUG_GUI.toggle();}, "press", false);

        Controls.register("e", function(key, ev){GUIS.INVENTORY.toggle();}, "press", true);
    }

    this.init =
    function init()
    {
        this.registerControls();

        $(document).keydown(function(e)
        {
            e.key = e.key.toLowerCase();

            for (var i = 0; i < Controls.controlMap.length; i++)
            {
                if(Controls.controlMap[i]["key"] == e.key && (MouseUtil.isLocked || !Controls.controlMap[i].needLock))
                {
                    if(!Controls.controlMap[i]["pressed"])
                    {
                        if(Controls.controlMap[i]["type"] == "press")
                        {
                            Controls.controlMap[i]["call"](e.key, e);
                        }

                        Controls.controlMap[i]["pressed"] = true;
                    }
                    e.preventDefault();
                }
            }

            GamePadControls.gamepadEnabled = false;
        });

        $(document).keyup(function(e)
        {
            e.key = e.key.toLowerCase();

            for (var i = 0; i < Controls.controlMap.length; i++)
            {
                if(Controls.controlMap[i]["key"] == e.key && (MouseUtil.isLocked || !Controls.controlMap[i].needLock))
                {
                    if(Controls.controlMap[i]["type"] == "release")
                    {
                        Controls.controlMap[i]["call"](e.key, e);
                    }

                    Controls.controlMap[i]["pressed"] = false;
                }
            }
        });

        $(document).mousedown(function(e)
        {
            if(MouseUtil.isLocked)
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

                        e.preventDefault();
                    }
                }
            }

            GamePadControls.gamepadEnabled = false;
        });

        $(document).mouseup(function(e)
        {
            if(MouseUtil.isLocked)
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

                        e.preventDefault();
                    }
                }
            }
        });

        $(document).bind("wheel", function(e)
        {
            clearTimeout(Controls.wheelTimeout);
            Controls.wheelTimeout = setTimeout(function()
            {
                if(MouseUtil.isLocked)
                {
                    for (var i = 0; i < Controls.controlMap.length; i++)
                    {
                        if(Controls.controlMap[i]["key"] == "mousewheel")
                        {
                            Controls.controlMap[i]["call"]((Math.sign(e.originalEvent.deltaY)), e);
                        }
                    }
                }
            }, 5);
        });
    }

    this.update =
    function update()
    {
        if(MouseUtil.isLocked)
        {
            for (var i = 0; i < Controls.controlMap.length; i++)
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
        else
        {
            for (var i = 0; i < Controls.controlMap.length; i++)
            {
                if(this.controlMap[i]["pressed"])
                {
                    if(this.controlMap[i]["type"] == "release")
                    {
                        this.controlMap[i]["call"](this.controlMap[i]["key"]);
                    }
                    this.controlMap[i]["pressed"] = false;
                }
            }
        }
    }

    this.register =
    function register(char, callback, type, needLock)
    {
    	this.controlMap.push({"key" : char, "call" : callback, "type" : type, "pressed" : false, "needLock": needLock});
    }
}

var Controls = new Controls();
