function TileBounded(id, name, color)
{
    Tile.call(this, id, name, color);
    this.renderBox = new AABB(0, 0, 0, 1, 1, 1);
    this.collisionBox = new AABB(0, 0, 0, 1, 1, 1);

    this.renderId =
    function renderId()
    {
        return 3;
    }

    this.isSideVisible =
    function isSideVisible(side, otherTile)
    {
        if(otherTile.isOppositeVisible(side, this))
        {
            return true;
        }

        switch(side)
        {
            case 0:
            {
                return this.normalizedRenderBox.y2 != 1;
            }
            case 1:
            {
                return this.normalizedRenderBox.y != 0;
            }
            case 2:
            {
                return this.normalizedRenderBox.x2 != 1;
            }
            case 3:
            {
                return this.normalizedRenderBox.x != 0;
            }
            case 4:
            {
                return this.normalizedRenderBox.z2 != 1;
            }
            case 5:
            {
                return this.normalizedRenderBox.z != 0;
            }
        }
    }

    this.isOppositeVisible =
    function isOppositeVisible(side, self)
    {
        switch(side)
        {
            case 0:
            {
                return this.normalizedRenderBox.y != 0 || self.normalizedRenderBox.x < this.normalizedRenderBox.x  || self.normalizedRenderBox.x2 > this.normalizedRenderBox.x2 || self.normalizedRenderBox.z < this.normalizedRenderBox.z  || self.normalizedRenderBox.z2 > this.normalizedRenderBox.z2;
            }
            case 1:
            {
                return this.normalizedRenderBox.y2 != 1 || self.normalizedRenderBox.x < this.normalizedRenderBox.x  || self.normalizedRenderBox.x2 > this.normalizedRenderBox.x2 || self.normalizedRenderBox.z < this.normalizedRenderBox.z  || self.normalizedRenderBox.z2 > this.normalizedRenderBox.z2;
            }
            case 2:
            {
                return this.normalizedRenderBox.x != 0 || self.normalizedRenderBox.y < this.normalizedRenderBox.y  || self.normalizedRenderBox.y2 > this.normalizedRenderBox.y2 || self.normalizedRenderBox.z < this.normalizedRenderBox.z  || self.normalizedRenderBox.z2 > this.normalizedRenderBox.z2;
            }
            case 3:
            {
                return this.normalizedRenderBox.x2 != 1 || self.normalizedRenderBox.y < this.normalizedRenderBox.y  || self.normalizedRenderBox.y2 > this.normalizedRenderBox.y || self.normalizedRenderBox.z < this.normalizedRenderBox.z  || self.normalizedRenderBox.z2 > this.normalizedRenderBox.z2;
            }
            case 4:
            {
                return this.normalizedRenderBox.z != 0 || self.normalizedRenderBox.y < this.normalizedRenderBox.y  || self.normalizedRenderBox.y2 > this.normalizedRenderBox.y || self.normalizedRenderBox.x < this.normalizedRenderBox.x  || self.normalizedRenderBox.x2 > this.normalizedRenderBox.x2;
            }
            case 5:
            {
                return this.normalizedRenderBox.z2 != 1 || self.normalizedRenderBox.y < this.normalizedRenderBox.y  || self.normalizedRenderBox.y2 > this.normalizedRenderBox.y || self.normalizedRenderBox.x < this.normalizedRenderBox.x  || self.normalizedRenderBox.x2 > this.normalizedRenderBox.x2;
            }
        }
    }

    this.getAABB =
    function getAABB(x, y, z)
    {
        return this.collisionBox != null ? this.collisionBox.duplicateNormalizedAt(x, y, z) : null;
    }

    this.getRenderAABB =
    function getRenderAABB(x,y,z)
    {
        return this.renderBox != null ? this.renderBox.duplicateNormalizedAt(x, y, z) : null;
    }

    this.setRenderAABB =
    function setRenderAABB(aabb)
    {
        this.renderBox = aabb;
        this.normalizedRenderBox = aabb;
        return this;
    }

    this.setCollisionAABB =
    function setCollisionAABB(aabb)
    {
        this.collisionBox = aabb;
        return this;
    }
}

TileBounded.prototype = Object.create(Tile.prototype);
TileBounded.prototype.constructor = TileBounded;
