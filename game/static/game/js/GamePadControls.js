function GamePadControls()
{
    this.controlMap = [];
    this.axisMap = [];
    this.wheelTimeout = 0;
    this.wheelEvent = 0;

    this.init =
    function init()
    {
        var gamepad = new Gamepad();

        gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e)
        {
            if(FPSCamera.locked)
            {
                for (var i = 0; i < GamePadControls.controlMap.length; i++)
                {
                    if(GamePadControls.controlMap[i]["key"] == e.control)
                    {
                        if(GamePadControls.controlMap[i]["type"] == "press")
                        {
                            GamePadControls.controlMap[i]["call"](GamePadControls.controlMap[i]["replacement"], e);
                        }

                        if(GamePadControls.controlMap[i]["type"] != "release")
                        {
                            GamePadControls.controlMap[i]["pressed"] = true;
                        }
                    }
                }
            }
            else
            {
                FPSCamera.attachPointer();
            }
        });

        gamepad.bind(Gamepad.Event.BUTTON_UP, function(e)
        {
            if(FPSCamera.locked)
            {
                for (var i = 0; i < GamePadControls.controlMap.length; i++)
                {
                    if(GamePadControls.controlMap[i]["key"] == e.control)
                    {
                        if(GamePadControls.controlMap[i]["type"] == "release")
                        {
                            GamePadControls.controlMap[i]["call"](GamePadControls.controlMap[i]["replacement"], e);
                        }

                        if(GamePadControls.controlMap[i]["type"] != "press")
                        {
                            GamePadControls.controlMap[i]["pressed"] = false;
                        }
                    }
                }
            }
        });

        gamepad.bind(Gamepad.Event.TICK, function(gamepads)
        {
            for(var i = 0; i < 4; i++)
            {
                var value = gamepads[0].axes[i];
                value = Math.abs(value) < 0.2 ? 0 : value;
                if(FPSCamera.locked)
                {
                    for (var j = 0; j < GamePadControls.axisMap.length; j++)
                    {
                        if(GamePadControls.axisMap[j]["axis"] == i)
                        {
                            GamePadControls.axisMap[j]["value"] = value;
                        }
                    }
                }
            }
        });

        gamepad.init();
    }

    this.update =
    function update()
    {
        if(FPSCamera.locked)
        {
            for (var i = 0; i < GamePadControls.controlMap.length; i++)
            {
                if(this.controlMap[i]["pressed"])
                {
                    if(this.controlMap[i]["type"] == "hold")
                    {
                        this.controlMap[i]["call"](this.controlMap[i]["replacement"]);
                    }
                }
            }

            for (var i = 0; i < GamePadControls.axisMap.length; i++)
            {
                this.axisMap[i]["call"](this.axisMap[i]["value"]);
            }
        }
    }

    this.register =
    function register(char, replacement, callback, type)
    {
    	this.controlMap.push({"key" : char, "replacement": replacement, "call" : callback, "type" : type, "pressed" : false});
    }

    this.registerAxis =
    function registerAxis(axis, callback)
    {
    	this.axisMap.push({"axis" : axis,  "call": callback, "value": 0});
    }
}

function moveTileChooser(control, ev)
{
    FPSCamera.chooseTile(control == "up" ? 1 : -1);
}

var GamePadControls = new GamePadControls();

GamePadControls.register("FACE_1", " ", FPSCamera.fly, "hold");
GamePadControls.registerAxis("0", function(value)
{
    FPSCamera.moveFromForce(0, value);
});
GamePadControls.registerAxis("1", function(value)
{
    FPSCamera.moveFromForce(-value, 0);
});
GamePadControls.registerAxis("2", function(value)
{
    FPSCamera.cameraYaw -= value * FPSCamera.sensitivity * 16;
});
GamePadControls.registerAxis("3", function(value)
{
    FPSCamera.cameraPitch -= value * FPSCamera.sensitivity * 16;
});

GamePadControls.register("LEFT_TOP_SHOULDER", "up", moveTileChooser, "press");
GamePadControls.register("RIGHT_TOP_SHOULDER", "down", moveTileChooser, "press");

GamePadControls.register("LEFT_BOTTOM_SHOULDER", "mouse-0", FPSCamera.placeTile, "press");
GamePadControls.register("RIGHT_BOTTOM_SHOULDER", "mouse-2", FPSCamera.placeTile, "press");

GamePadControls.register("LEFT_STICK", "shift", FPSCamera.fly, "hold");
GamePadControls.register("RIGHT_STICK", "gamepack_stick", FPSCamera.pickTile, "press");
