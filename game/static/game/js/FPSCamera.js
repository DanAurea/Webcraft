function FPSCamera()
{
    this.cameraPitch = 0;
    this.cameraYaw = 0;
    this.locked = false;
    this.sensitivity = 0.1;
    this.targetTile = null;
    this.hoverMesh = null;
    this.placeDistance = 6;
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
        var material = new THREE.MeshBasicMaterial({color: 0xFF0000, transparent: true, opacity: 0.25});
        this.hoverMesh = new THREE.Mesh(geometry, material);
        scene.add(this.hoverMesh);
    }

    this.lockChange =
    function lockChange()
    {

        if (document.pointerLockElement === $("#gameContainer")[0] ||
            document.mozPointerLockElement === $("#gameContainer")[0] ||
            document.webkitpointerLockElement === $("#gameContainer")[0])
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

        thePlayer.pitch = FPSCamera.cameraPitch;
        thePlayer.yaw = FPSCamera.cameraYaw + 90;

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

    this.placeDebug = false;

    this.getTileLookingAt =
    function getTileLookingAt()
    {
        //Calculate look angle
        var lookAngleX = -Math.sin(FPSCamera.toRadians(FPSCamera.cameraYaw)) * Math.cos(FPSCamera.toRadians(FPSCamera.cameraPitch));
        var lookAngleY = Math.sin(FPSCamera.toRadians(FPSCamera.cameraPitch));
        var lookAngleZ = -Math.cos(FPSCamera.toRadians(FPSCamera.cameraYaw)) * Math.cos(FPSCamera.toRadians(FPSCamera.cameraPitch));

        //Get tiles in range
        var nearestIntersect = null;
        var minDistance = 100000;
        var tiles = new AABB(camera.position.x, camera.position.y, camera.position.z, camera.position.x, camera.position.y, camera.position.z).expandBox(lookAngleX * this.placeDistance, lookAngleY * this.placeDistance, lookAngleZ * this.placeDistance).tilesInBox(false);
        for(var i = 0, length = tiles.length; i < length; i++)
        {
            var x = tiles[i][1];
            var y = tiles[i][2];
            var z = tiles[i][3];
            var tile = tiles[i][0];
            var aabb = tile.getRenderAABB(x, y, z);

            var intersect = aabb.intersectLine(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z), new THREE.Vector3(camera.position.x + lookAngleX * this.placeDistance, camera.position.y + lookAngleY * this.placeDistance, camera.position.z + lookAngleZ * this.placeDistance));
            if(intersect.normal != null)
            {
                var distance = camera.position.distanceTo(intersect.intersect);
                if(distance < minDistance)
                {
                    minDistance = distance;
                    nearestIntersect = {"x": x, "y": y, "z": z, "normal": intersect.normal};
                }
            }
        }
        return nearestIntersect;
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
    function chooseTile(direction, ev)
    {
        FPSCamera.tileId = Math.max(1, Math.min(FPSCamera.tileId - direction, Tiles.tiles.length - 1));
    }

    this.pickTile =
    function pickTile(key, ev)
    {
        if(FPSCamera.targetTile != null)
        {
            var tX = FPSCamera.targetTile.x;
            var tY = FPSCamera.targetTile.y;
            var tZ = FPSCamera.targetTile.z;

            var tileAt = MapManager.getTileAt(tX, tY, tZ);
            if(tileAt != 0)
            {
                FPSCamera.tileId = tileAt;
            }
        }
        ev.preventDefault();
    }

    this.placeTile =
    function placeTile(key, ev)
    {
        var place = key == "mouse-0";

        if(FPSCamera.targetTile != null)
        {
            var tX = FPSCamera.targetTile.x;
            var tY = FPSCamera.targetTile.y;
            var tZ = FPSCamera.targetTile.z;

            if(place)
            {
                tX += FPSCamera.targetTile.normal[0];
                tY += FPSCamera.targetTile.normal[1];
                tZ += FPSCamera.targetTile.normal[2];

                //Check block is air
                var tileAt = MapManager.getTileAt(tX, tY, tZ);
                if(tileAt == 0)
                {
                    var tileAABB = Tiles.getTile(FPSCamera.tileId).getAABB(tX, tY, tZ);

                    //Check players collision
                    var collided = false;
                    for(var i = 0, length = Entities.entityList.length; i < length; i++)
                    {
                        if(Entities.entityList[i].collision.intersect(tileAABB))
                        {
                            collided = true;
                            break;
                        }
                    }

                    if(!collided)
                    {
                        MapManager.setTileAt(FPSCamera.tileId, tX, tY, tZ);

                        if(!offlineMode)
                        {
                            PacketsUtil.sendPacket(new PacketPlaceTile(tX, tY, tZ, FPSCamera.tileId));
                        }
                    }
                }
            }
            else
            {
                //Break
                MapManager.setTileAt(0, tX, tY, tZ);

                if(!offlineMode)
                {
                    PacketsUtil.sendPacket(new PacketPlaceTile(tX, tY, tZ, 0));
                }
            }
        }
    }
}

var FPSCamera = new FPSCamera();
