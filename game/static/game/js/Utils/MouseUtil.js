function MouseUtil()
{
    this.mouseX = 0;
    this.mouseY = 0;
    this.isLocked = false;
    this.sensitivity = 0.1;

    this.init =
    function init()
    {
        var container = $("#gameContainer")[0];
        container.requestPointerLock = container.requestPointerLock || container.mozRequestPointerLock;
    	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    	document.addEventListener('pointerlockchange', this.lockChange, false);
    	document.addEventListener('mozpointerlockchange', this.lockChange, false);
    	document.addEventListener('webkitpointerlockchange', this.lockChange, false);

    	container.onclick = function(e)
    	{
            if(!ContainerManager.onClick())
            {
                MouseUtil.attachPointer();
            }
            else
            {
                e.preventDefault();
            }
    	};

        document.addEventListener("mousemove", function(e)
        {
            if(!GamePadControls.gamepadEnabled)
            {
                if(!MouseUtil.isLocked)
                {
                    MouseUtil.mouseX = e.x;
                    MouseUtil.mouseY = height - e.y;
                }
                else
                {
                    MouseUtil.mouseX = MouseUtil.mouseY = 0;
                }
            }
        }, false);
    }


    this.releasePointer =
    function releasePointer()
    {
        document.exitPointerLock();
    }

    this.attachPointer =
    function attachPointer()
    {
        var container = $("#gameContainer")[0];
        container.requestPointerLock();
    }

    this.lockChange =
    function lockChange()
    {

        if (document.pointerLockElement === $("#gameContainer")[0] ||
            document.mozPointerLockElement === $("#gameContainer")[0] ||
            document.webkitpointerLockElement === $("#gameContainer")[0])
        {

            MouseUtil.isLocked = true;
            document.addEventListener("mousemove", FPSCamera.onMouseMove, false);
        }
        else
        {
            MouseUtil.isLocked = false;
            document.removeEventListener("mousemove", FPSCamera.onMouseMove, false);
        }
    }

    this.centerGamepadPointer =
    function centerGamepadPointer()
    {
        if(GamePadControls.gamepadEnabled)
        {
            MouseUtil.mouseX = width / 2;
            MouseUtil.mouseY = height / 2;
        }
    }
}

var MouseUtil = new MouseUtil();
