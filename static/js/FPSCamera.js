var cameraPitch = 0;
var cameraYaw = 0;
var locked = false;
var sensitivity = 0.1;

function initFPSCamera()
{
    var container = $("#gameContainer")[0];
    container.requestPointerLock = container.requestPointerLock || container.mozRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);

	container.onclick = function()
	{
		container.requestPointerLock();
	};
}

function lockChangeAlert()
{
	if (document.pointerLockElement === $("#gameContainer")[0])
	{
		locked = true;
		document.addEventListener("mousemove", updateCamera, false);
	}
	else
	{
		locked = false;
		document.removeEventListener("mousemove", updateCamera, false);
	}
}

function updateCamera(e)
{
	cameraYaw -= e.movementX * sensitivity;
	cameraPitch -= e.movementY * sensitivity;

	//Clamp pitch
	cameraPitch = Math.min(Math.max(cameraPitch, -90), 90);
}

function toRadians(degrees)
{
	return degrees * (Math.PI / 180);
}
