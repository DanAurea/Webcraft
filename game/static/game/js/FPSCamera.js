function FPSCamera()
{
    this.cameraPitch = 0;
    this.cameraYaw = 0;
    this.locked = false;
    this.sensitivity = 0.1;
    this.targetTile = null;
    this.hoverMesh = null;
    this.mousePos = new THREE.Vector2(0, 0);
    this.rayCast = new THREE.Raycaster();
    this.tileId = 2;

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

        var geometry = new THREE.CubeGeometry(1.01, 1.01, 1.01);
        var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.05});
        this.hoverMesh = new THREE.Mesh(geometry, material);
        scene.add(this.hoverMesh);
    }

    this.lockChange =
    function lockChange()
    {
        document.pointerLockElement = document.pointerLockElement || document.mozPointerLockElement;

    	if (document.pointerLockElement === $("#gameContainer")[0])
    	{
    		FPSCamera.locked = true;
    		document.addEventListener("mousemove", FPSCamera.onMouseMove, false);
    	}
    	else
    	{
    		FPSCamera.locked = false;
    		document.removeEventListener("mousemove", FPSCamera.onMouseMove, false);
    	}
    }

    this.onMouseMove =
    function onMouseMove(e)
    {
        var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

    	FPSCamera.cameraYaw -= movementX * FPSCamera.sensitivity;
    	FPSCamera.cameraPitch -= movementY * FPSCamera.sensitivity;

    	//Clamp pitch
    	FPSCamera.cameraPitch = Math.min(Math.max(FPSCamera.cameraPitch, -90), 90);
    }

    this.toRadians =
    function toRadians(degrees)
    {
    	return degrees * (Math.PI / 180);
    }

    this.updateCamera =
    function updateCamera()
    {
        camera.position.x = TimeManager.interpolate(thePlayer.prevX, thePlayer.x);
        camera.position.y = TimeManager.interpolate(thePlayer.prevY, thePlayer.y) + 1.75;
        camera.position.z = TimeManager.interpolate(thePlayer.prevZ, thePlayer.z);

        camera.rotation.x = FPSCamera.toRadians(FPSCamera.cameraPitch);
        camera.rotation.y = FPSCamera.toRadians(FPSCamera.cameraYaw);
        camera.rotation.z = 0;

        this.targetTile = this.getTileLookingAt();
        if(this.targetTile != null)
        {
			var tile = Tiles.getTile(MapManager.getTileAt(this.targetTile.x, this.targetTile.y, this.targetTile.z));
            this.hoverMesh.visible = true;
			this.hoverMesh.scale.y = tile.height;
            this.hoverMesh.position.set(this.targetTile.x + 0.5, this.targetTile.y + tile.height / 2, this.targetTile.z + 0.5);
        }
        else
        {
            this.hoverMesh.visible = false;
        }
    }

    this.getTileLookingAt =
    function getTileLookingAt()
    {
        var obstacles = [];
        var group;
        for(var i = 0, chunkAmount = MapManager.chunks.length; i < chunkAmount; i++)
        {
            group = MapManager.chunks[i].group;
            if(group != null)
            {
                group.traverse(function(child)
                {
    				if(child instanceof THREE.Mesh)
                    {
    					obstacles.push(child);
    				}
    			});
            }
        }

        this.rayCast.setFromCamera(this.mousePos, camera);
        var collisions = this.rayCast.intersectObjects(obstacles);
        if (collisions.length >= 1 && collisions[0].distance <= 10)
        {
            var normal = collisions[0].face.normal;
            var xFix = normal.x == 1 && collisions[0].point.x % 1 == 0 ? -1 : 0;
            var yFix = normal.y == 1 && collisions[0].point.y % 1 == 0 ? -1 : 0;
            var zFix = normal.z == 1 && collisions[0].point.z % 1 == 0 ? -1 : 0;

            return {"x": parseInt(collisions[0].point.x + xFix), "y": parseInt(collisions[0].point.y + yFix), "z": parseInt(collisions[0].point.z + zFix), "normal": normal};
        }

        return null;
    }

    this.move =
    function move(key)
    {
        var forward = key == "z" ? 1 : (key == "s" ? -1 : 0);
        var strafe = key == "d" ? 1 : (key == "q" ? -1 : 0);

        thePlayer.inputMotX += ((Math.sin(FPSCamera.toRadians(FPSCamera.cameraYaw + 90)) * strafe) - (Math.sin(FPSCamera.toRadians(FPSCamera.cameraYaw)) * forward)) * 0.15;
        thePlayer.inputMotZ += ((Math.cos(FPSCamera.toRadians(FPSCamera.cameraYaw + 90)) * strafe) - (Math.cos(FPSCamera.toRadians(FPSCamera.cameraYaw)) * forward)) * 0.15;

        if(thePlayer.fly)
        {
            thePlayer.inputMotY += (key == " " ? 1 : (key == "shift" ? -1 : 0)) * 0.3;
        }
        else if(key == " ")
        {
            thePlayer.jump();
        }
    }

    this.chooseTile =
    function chooseTile(key)
    {
        FPSCamera.tileId = Math.max(1, Math.min(FPSCamera.tileId + (key == "arrowup" ? 1 : -1), Tiles.tiles.length - 1));
    }

    this.placeTile =
    function placeTile(key)
    {
        var place = key == "mouse-0";

        if(FPSCamera.targetTile != null)
        {
            var tX = FPSCamera.targetTile.x;
            var tY = FPSCamera.targetTile.y;
            var tZ = FPSCamera.targetTile.z;

            if(place)
            {
                tX += FPSCamera.targetTile.normal.x;
                tY += FPSCamera.targetTile.normal.y;
                tZ += FPSCamera.targetTile.normal.z;
            }

            MapManager.setTileAt(place ? FPSCamera.tileId : 0, tX, tY, tZ);
        }
    }
}

var FPSCamera = new FPSCamera();
