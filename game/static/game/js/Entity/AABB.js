function AABB(x, y, z, x2, y2, z2)
{
    this.x = x
    this.y = y;
    this.z = z;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;

    this.updatePos =
    function updatePos(x, y, z)
    {
        var sX = this.x2 - this.x;
        var sY = this.y2 - this.y;
        var sZ = this.z2 - this.z;

        this.x = x;
        this.y = y;
        this.z = z;
        this.x2 = x + sX;
        this.y2 = y + sY;
        this.z2 = z + sZ;
    }

    this.updatePosCenter =
    function updatePosCenter(x, y, z)
    {
        var sX = (this.x2 - this.x) / 2;
        var sY = this.y2 - this.y;
        var sZ = (this.z2 - this.z) / 2;

        this.x = x - sX;
        this.y = y;
        this.z = z - sZ;
        this.x2 = x + sX;
        this.y2 = y + sY;
        this.z2 = z + sZ;
    }

    this.move =
    function move(x, y, z)
    {
        this.x += x;
        this.y += y;
        this.z += z;
        this.x2 += x;
        this.y2 += y;
        this.z2 += z;
    }

    this.expandBox =
    function expandBox(x, y, z)
    {
        var newBox = new AABB(this.x, this.y, this.z, this.x2, this.y2, this.z2);

        if(x < 0)
        {
            newBox.x += x;
        }
        else
        {
            newBox.x2 += x;
        }

        if(y < 0)
        {
            newBox.y += y;
        }
        else
        {
            newBox.y2 += y;
        }

        if(z < 0)
        {
            newBox.z += z;
        }
        else
        {
            newBox.z2 += z;
        }

        return newBox;
    }

    this.tilesInBox =
    function tilesInBox()
    {
        var tiles = [];
        var x, y, z;
        var bX = Math.floor(this.x);
        var bY = Math.floor(this.y);
        var bZ = Math.floor(this.z);
        var bX2 = Math.ceil(this.x2);
        var bY2 = Math.ceil(this.y2);
        var bZ2 = Math.ceil(this.z2);
        var tile;
        for(x = bX; x < bX2; x++)
        {
            for(z = bZ; z < bZ2; z++)
            {
                for(y = bY; y < bY2; y++)
                {
                    tile = MapManager.getTileAt(x, y, z);
                    if(tile != 0)
                    {
                        var aabb = Tiles.getTile(tile).getAABB(x, y, z);
                        if(aabb != null)
                        {
                            tiles.push(aabb);
                        }
                    }
                }
            }
        }

        //Add boundaries
        mapWidth = MapManager.totalWidth;
        mapLength = MapManager.totalLength;

        //Floor & Ceiling
        tiles.push(new AABB(0, -100, 0, mapWidth, 0, mapLength));
        tiles.push(new AABB(0, 500, 0, mapWidth, 501, mapLength));

        //X Axis
        tiles.push(new AABB(0, 0, -1, mapWidth, 501, 0));
        tiles.push(new AABB(0, 0, mapLength, mapWidth, 501, mapLength + 1));

        //Z Axis
        tiles.push(new AABB(-1, 0, 0, 0, 501, mapLength));
        tiles.push(new AABB(mapWidth, 0, 0, mapWidth + 1, 501, mapLength));

        return tiles;
    }

    this.clipX =
    function clipX(hitbox, posX)
    {
        if (hitbox.y >= this.y2 || hitbox.y2 <= this.y || hitbox.z >= this.z2 || hitbox.z2 <= this.z)
		{
			return posX;
		}
		else if (posX > 0 && hitbox.x2 <= this.x)
		{
			var distance = this.x - hitbox.x2;
			return distance < posX ? distance : posX;
		}
		else if (posX < 0 && hitbox.x >= this.x2)
		{
			var distance = this.x2 - hitbox.x;
			return distance > posX ? distance : posX;
		}
		return posX;
    }

    this.clipY =
    function clipY(hitbox, posY)
    {
        //Check outside
        if (hitbox.x >= this.x2 || hitbox.x2 <= this.x || hitbox.z >= this.z2 || hitbox.z2 <= this.z)
		{
			return posY;
		}
        else if (posY > 0 && hitbox.y2 <= this.y)
		{
			var distance = this.y - hitbox.y2;
			return distance < posY ? distance : posY;
		}
		else if (posY < 0 && hitbox.y >= this.y2)
		{
			var distance = this.y2 - hitbox.y;
			return distance > posY ? distance : posY;
		}
		return posY;
    }

    this.clipZ =
    function clipZ(hitbox, posZ)
    {
        if (hitbox.y >= this.y2 || hitbox.y2 <= this.y || hitbox.x >= this.x2 || hitbox.x2 <= this.x)
		{
			return posZ;
		}
		else if (posZ > 0 && hitbox.z2 <= this.z)
		{
			var distance = this.z - hitbox.z2;
			return distance < posZ ? distance : posZ;
		}
		else if (posZ < 0 && hitbox.z >= this.z2)
		{
			var distance = this.z2 - hitbox.z;
			return distance > posZ ? distance : posZ;
		}
		return posZ;
    }
}
