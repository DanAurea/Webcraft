function Tile(id, name, color)
{
    Tiles.tiles[id] = this;
    Tiles.placableTiles.push(this);
    this.id = id;
    this.name = name;
    this.color = color;
    this.red = ((color >> 16) & 255) / 255;
    this.green = ((color >> 8) & 255) / 255;
    this.blue = ((color) & 255) / 255;
    this.normalizedRenderBox  = new AABB(0, 0, 0, 1, 1, 1);
    this.unbreakable = false;

    this.renderId =
    function renderId()
    {
        return 1;
    }

    this.isSideVisible =
    function isSideVisible(side, otherTile)
    {
        return otherTile.isOppositeVisible(side, this);
    }

    this.isOppositeVisible =
    function isOppositeVisible(side, self)
    {
        return this.renderId() == 0;
    }

    this.getAABB =
    function getAABB(x, y, z)
    {
        return new AABB(x, y, z, x + 1, y + 1, z + 1);
    }

    this.getRenderAABB =
    function getRenderAABB(x,y,z)
    {
        return new AABB(x, y, z, x + 1, y + 1, z + 1);
    }

    this.setUnplacable =
    function setUnplacable()
    {
        var index = Tiles.placableTiles.indexOf(this);
        if(index != -1)
        {
            Tiles.placableTiles.splice(index, 1);
        }

        return this;
    }

    this.setUnbreakable =
    function setUnbreakable()
    {
        this.unbreakable = true;
        return self;
    }
}
