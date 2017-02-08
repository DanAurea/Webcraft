function FPSCamera()
{
    this.cameraPitch = 0;
    this.cameraYaw = 0;
    this.locked = false;
    this.sensitivity = 0.1;

    this.initFPSCamera =
    function initFPSCamera()
    {
        var container = $("#gameContainer")[0];
        container.requestPointerLock = container.requestPointerLock || container.mozRequestPointerLock;
    	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
    	document.addEventListener('pointerlockchange', this.lockChange, false);
    	document.addEventListener('mozpointerlockchange', this.lockChange, false);
    	document.addEventListener('webkitpointerlockchange', this.lockChange, false);

    	container.onclick = function()
    	{
    		container.requestPointerLock();
    	};
    }

    this.lockChange =
    function lockChange()
    {
    	if (document.pointerLockElement === $("#gameContainer")[0])
    	{
    		FPSCamera.locked = true;
    		document.addEventListener("mousemove", FPSCamera.updateCamera, false);
    	}
    	else
    	{
    		FPSCamera.locked = false;
    		document.removeEventListener("mousemove", FPSCamera.updateCamera, false);
    	}
    }

    this.updateCamera =
    function updateCamera(e)
    {
    	FPSCamera.cameraYaw -= e.movementX * FPSCamera.sensitivity;
    	FPSCamera.cameraPitch -= e.movementY * FPSCamera.sensitivity;

    	//Clamp pitch
    	FPSCamera.cameraPitch = Math.min(Math.max(FPSCamera.cameraPitch, -90), 90);
    }

    this.toRadians =
    function toRadians(degrees)
    {
    	return degrees * (Math.PI / 180);
    }

    this.move =
    function move(key)
    {
        var forward = key == "z" ? 1 : (key == "s" ? -1 : 0);
        var strafe = key == "d" ? 1 : (key == "q" ? -1 : 0);

        var motionX = ((Math.sin(FPSCamera.toRadians(FPSCamera.cameraYaw + 90)) * strafe / 2) - (Math.sin(FPSCamera.toRadians(FPSCamera.cameraYaw)) * forward)) * TimeManager.delta * 0.05;
        var motionZ = ((Math.cos(FPSCamera.toRadians(FPSCamera.cameraYaw + 90)) * strafe / 2) - (Math.cos(FPSCamera.toRadians(FPSCamera.cameraYaw)) * forward)) * TimeManager.delta * 0.05;
        var motionY = key == " " ? 1 : (key == "Shift" ? -1 : 0);

        camera.position.x += motionX;
        camera.position.y += motionY;
        camera.position.z += motionZ;
    }
}

var FPSCamera = new FPSCamera();
