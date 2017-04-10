function GamePadControls()
{
    this.controlMap = [];
    this.axisMap = [];
    this.wheelTimeout = 0;
    this.wheelEvent = 0;
    this.gamepadEnabled = false;

    this.registerControls =
    function registerControls()
    {
        GamePadControls.register("FACE_1", " ", FPSCamera.fly, "hold", true);
        GamePadControls.registerAxis("0", function(value)
        {
            FPSCamera.moveFromForce(0, value);
        }, true);
        GamePadControls.registerAxis("1", function(value)
        {
            FPSCamera.moveFromForce(-value, 0);
        }, true);
        GamePadControls.registerAxis("2", function(value)
        {
            FPSCamera.cameraYaw -= value * MouseUtil.sensitivity * 16;
        }, true);
        GamePadControls.registerAxis("3", function(value)
        {
            FPSCamera.cameraPitch -= value * MouseUtil.sensitivity * 16;
            FPSCamera.cameraPitch = Math.min(Math.max(FPSCamera.cameraPitch, -90), 90);
        }, true);

        GamePadControls.registerAxis("0", function(value)
        {
            MouseUtil.mouseX += value * 6;
        }, false);
        GamePadControls.registerAxis("1", function(value)
        {
            MouseUtil.mouseY -= value * 6;
        }, false);

        GamePadControls.register("LEFT_TOP_SHOULDER", "down", moveTileChooser, "press", true);
        GamePadControls.register("RIGHT_TOP_SHOULDER", "up", moveTileChooser, "press", true);

        GamePadControls.register("LEFT_BOTTOM_SHOULDER", "mouse-0", FPSCamera.placeTile, "press", true);
        GamePadControls.register("RIGHT_BOTTOM_SHOULDER", "mouse-2", FPSCamera.placeTile, "press", true);

        GamePadControls.register("LEFT_STICK", "shift", FPSCamera.fly, "hold", true);
        GamePadControls.register("RIGHT_STICK", "gamepack_stick", FPSCamera.pickTile, "press", true);

        GamePadControls.register("SELECT_BACK", "tab", function(key, ev){GUIS.PLAYER_LIST.open();}, "press", true);
        GamePadControls.register("SELECT_BACK", "tab", function(key, ev){GUIS.PLAYER_LIST.close();}, "release", true);

        GamePadControls.register("FACE_4", "e", function(key, ev){GUIS.INVENTORY.toggle();}, "press", false);
        GamePadControls.register("FACE_1", "", function(){ContainerManager.onClick();}, "press", false);
    }

    this.init =
    function init()
    {
        this.registerControls();
        var gamepad = new Gamepad();

        gamepad.bind(Gamepad.Event.BUTTON_DOWN, function(e)
        {
            for (var i = 0; i < GamePadControls.controlMap.length; i++)
            {
                if(GamePadControls.controlMap[i]["key"] == e.control && (MouseUtil.isLocked || !GamePadControls.controlMap[i].needLock))
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
            GamePadControls.gamepadEnabled = true;
        });

        gamepad.bind(Gamepad.Event.BUTTON_UP, function(e)
        {
            for (var i = 0; i < GamePadControls.controlMap.length; i++)
            {
                if(GamePadControls.controlMap[i]["key"] == e.control && (MouseUtil.isLocked || !GamePadControls.controlMap[i].needLock))
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
        });

        gamepad.bind(Gamepad.Event.TICK, function(gamepads)
        {
            for(var i = 0; i < 4; i++)
            {
                var value = gamepads[0].axes[i];
                value = Math.abs(value) < 0.2 ? 0 : value;
                for (var j = 0; j < GamePadControls.axisMap.length; j++)
                {
                    if(GamePadControls.axisMap[j]["axis"] == i && (MouseUtil.isLocked || !GamePadControls.axisMap[j].needLock))
                    {
                        GamePadControls.axisMap[j]["value"] = value;
                    }
                }

                if(value != 0)
                {
                    GamePadControls.gamepadEnabled = true;
                }
            }
        });

        gamepad.init();
    }

    this.update =
    function update()
    {
        for (var i = 0; i < GamePadControls.controlMap.length; i++)
        {
            if(this.controlMap[i]["pressed"] && (MouseUtil.isLocked || !this.controlMap[i].needLock))
            {
                if(this.controlMap[i]["type"] == "hold")
                {
                    this.controlMap[i]["call"](this.controlMap[i]["replacement"]);
                }
            }
        }

        for (var i = 0; i < GamePadControls.axisMap.length; i++)
        {
            if(MouseUtil.isLocked || !this.axisMap[i].needLock)
            {
                this.axisMap[i]["call"](this.axisMap[i]["value"]);
            }
        }
    }

    this.register =
    function register(char, replacement, callback, type, needLock)
    {
    	this.controlMap.push({"key" : char, "replacement": replacement, "call" : callback, "type" : type, "pressed" : false, "needLock": needLock});
    }

    this.registerAxis =
    function registerAxis(axis, callback, needLock)
    {
    	this.axisMap.push({"axis" : axis,  "call": callback, "value": 0, "needLock": needLock});
    }
}

function moveTileChooser(control, ev)
{
    FPSCamera.chooseTile(control == "up" ? 1 : -1);
}

var GamePadControls = new GamePadControls();
