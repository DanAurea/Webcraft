function AABB(x, y, z, x2, y2, z2)
{
    this.x = x
    this.y = y;
    this.z = z;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;

    this.intersect =
    function intersect(other)
    {
        return other != null && (this.x < other.x2 && this.x2 > other.x) && (this.y < other.y2 && this.y2 > other.y) && (this.z < other.z2 && this.z2 > other.z);
    }

    this.intersectLine =
    function intersectLine(startVec, endVector)
    {
        var output = {intersect: null, normal: null};
        var clipReturn = null;
        if(!(clipReturn = this.clipLine(this.x, this.x2, startVec.x, endVector.x, 0, 1))[0])
        {
            return output;
        }
        if(!(clipReturn = this.clipLine(this.y, this.y2, startVec.y, endVector.y, clipReturn[1], clipReturn[2]))[0])
        {
            return output;
        }
        if(!(clipReturn = this.clipLine(this.z, this.z2, startVec.z, endVector.z, clipReturn[1], clipReturn[2]))[0])
        {
            return output;
        }

        var sub = endVector.sub(startVec);
        var intersect = startVec.add(sub.multiplyScalar(clipReturn[1]));
        intersect.x = MathUtil.lessDecimal(intersect.x, 6);
        intersect.y = MathUtil.lessDecimal(intersect.y, 6);
        intersect.z = MathUtil.lessDecimal(intersect.z, 6);
        output.intersect = intersect;

        if(intersect.y == this.y)
        {
            output.normal = [0, -1, 0];
        }
        else if(intersect.y == this.y2)
        {
            output.normal = [0, 1, 0];
        }
        else if(intersect.x == this.x)
        {
            output.normal = [-1, 0, 0];
        }
        else if(intersect.x == this.x2)
        {
            output.normal = [1, 0, 0];
        }
        else if(intersect.z == this.z)
        {
            output.normal = [0, 0, -1];
        }
        else if(intersect.z == this.z2)
        {
            output.normal = [0, 0, 1];
        }
        else
        {
            output.normal = [0, 0, 0];//Inside
        }

        return output;
    }

    this.clipLine =
    function clipLine(x1, x2, startVecX, endVectorX, fLow, fHigh)
    {
        var fDimLow = (x1 - startVecX) / (endVectorX - startVecX);
        var fDimHigh = (x2 - startVecX) / (endVectorX - startVecX);

        if(fDimHigh < fDimLow)
        {
            var swap = fDimLow;
            fDimLow = fDimHigh;
            fDimHigh = swap;
        }

        if(fDimHigh < fLow || fDimLow > fHigh)
        {
            return [false, fLow, fHigh];
        }

        fLow = Math.max(fDimLow, fLow);
        fHigh = Math.min(fDimHigh, fHigh);

        if(fLow > fHigh)
        {
            return [false, fLow, fHigh];
        }

        return [true, fLow, fHigh];
    }

    this.duplicateNormalizedAt =
    function duplicateNormalizedAt(x, y, z)
    {
        return new AABB(this.x + x, this.y + y, this.z + z, x + this.x2, y + this.y2, z + this.z2);
    }

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

        this.x = MathUtil.lessDecimal(x - sX, 6);
        this.y = y;
        this.z = MathUtil.lessDecimal(z - sZ, 6);
        this.x2 = MathUtil.lessDecimal(x + sX, 6);
        this.y2 = y + sY;
        this.z2 = MathUtil.lessDecimal(z + sZ, 6);
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
    function tilesInBox(aabbSelect)
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
        var columnAabb;
        for(x = bX; x < bX2; x++)
        {
            for(z = bZ; z < bZ2; z++)
            {
                columnAabb = null;
                for(y = bY; y < bY2; y++)
                {
                    tileId = World.getTileAt(x, y, z);
                    if(tileId != 0)
                    {
                        var tile = Tiles.getTile(tileId);
                        if(aabbSelect)
                        {
                            var aabb = tile.getAABB(x, y, z);

                            if(aabb != null && columnAabb == null)
                            {
                                columnAabb = aabb;
                            }
                            else if(aabb != null && columnAabb != null)
                            {
                                columnAabb.y2 += aabb.y2 - aabb.y;
                            }
                            else if(aabb == null && columnAabb != null)
                            {
                                tiles.push(columnAabb);
                                columnAabb = null;
                            }
                        }
                        else
                        {
                            tiles.push([tile, x, y, z]);
                        }
                    }
                    else if(columnAabb != null)
                    {
                        tiles.push(columnAabb);
                        columnAabb = null;
                    }
                }

                if(columnAabb != null)
                {
                    tiles.push(columnAabb);
                }
            }
        }

        return tiles;
    }

    this.addMapBoundaries =
    function addMapBoundaries(aabbArray)
    {
        mapWidth = World.totalWidth;
        mapLength = World.totalLength;

        //Floor & Ceiling
        aabbArray.push(new AABB(0, -100, 0, mapWidth, 0, mapLength));
        aabbArray.push(new AABB(0, 500, 0, mapWidth, 501, mapLength));

        //X Axis
        aabbArray.push(new AABB(0, 0, -1, mapWidth, 501, 0));
        aabbArray.push(new AABB(0, 0, mapLength, mapWidth, 501, mapLength + 1));

        //Z Axis
        aabbArray.push(new AABB(-1, 0, 0, 0, 501, mapLength));
        aabbArray.push(new AABB(mapWidth, 0, 0, mapWidth + 1, 501, mapLength));
    }

    this.clipX =
    function clipX(hitbox, motX, useStepAssist)
    {
        if (hitbox.y >= this.y2 || hitbox.y2 <= this.y || hitbox.z >= this.z2 || hitbox.z2 <= this.z)
		{
			return [motX, -1];
		}
		else if (motX > 0 && hitbox.x2 <= this.x)
		{
            var stepHeight = this.y2 - hitbox.y;
            var distance = this.x - hitbox.x2;
            var nX = distance < motX ? distance : motX;

            if(useStepAssist && stepHeight <= 1.0 && stepHeight >= 0.0)
            {
                var newPos = new AABB(hitbox.x + motX, hitbox.y + stepHeight, hitbox.z, hitbox.x2 + motX + 0.001, hitbox.y2 + stepHeight, hitbox.z2);
                if(!newPos.intersectList(newPos.tilesInBox(true)))
                {
                    return [motX, stepHeight];
                }
            }
            return [nX, 0];
		}
		else if (motX < 0 && hitbox.x >= this.x2)
		{
            var stepHeight = this.y2 - hitbox.y;
            var distance = this.x2 - hitbox.x;
            var nX = distance > motX ? distance : motX;

            if(useStepAssist && stepHeight <= 1.0 && stepHeight >= 0.0)
            {
                var newPos = new AABB(hitbox.x + motX - 0.001, hitbox.y + stepHeight, hitbox.z, hitbox.x2 + motX, hitbox.y2 + stepHeight, hitbox.z2);
                if(!newPos.intersectList(newPos.tilesInBox(true)))
                {
                    return [motX, stepHeight];
                }
            }
            return [nX, 0];
		}
		return [motX, 0];
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
    function clipZ(hitbox, motZ, useStepAssist)
    {
        if (hitbox.y >= this.y2 || hitbox.y2 <= this.y || hitbox.x >= this.x2 || hitbox.x2 <= this.x)
		{
			return [motZ, 0];
		}
        else if (motZ > 0 && hitbox.z2 <= this.z)
		{
            var stepHeight = this.y2 - hitbox.y;
            var distance = this.z - hitbox.z2;
            var nZ = distance < motZ ? distance : motZ;

            if(useStepAssist && stepHeight <= 1.0 && stepHeight >= 0.0)
            {
                var newPos = new AABB(hitbox.x, hitbox.y + stepHeight, hitbox.z + motZ, hitbox.x2, hitbox.y2 + stepHeight, hitbox.z2 + motZ + 0.001);
                if(!newPos.intersectList(newPos.tilesInBox(true)))
                {
                    return [motZ, stepHeight];
                }
            }
            return [nZ, 0];
		}
		else if (motZ < 0 && hitbox.z >= this.z2)
		{
            var stepHeight = this.y2 - hitbox.y;
            var distance = this.z2 - hitbox.z;
            var nZ = distance > motZ ? distance : motZ;

            if(useStepAssist && stepHeight <= 1.0 && stepHeight >= 0.0)
            {
                var newPos = new AABB(hitbox.x, hitbox.y + stepHeight, hitbox.z + motZ - 0.001, hitbox.x2, hitbox.y2 + stepHeight, hitbox.z2 + motZ);
                if(!newPos.intersectList(newPos.tilesInBox(true)))
                {
                    return [motZ, stepHeight];
                }
            }
            return [nZ, 0];
		}
		return [motZ, 0];
    }

    this.intersectList =
    function intersectList(aabbs)
    {
        for(var i = 0, length = aabbs.length; i < length; i++)
        {
            if(this.intersect(aabbs[i]))
            {
                return true;
            }
        }
        return false;
    }
}
