function TileColorChange(id, name, color, redVariant, greenVariant, blueVariant)
{
    Tile.call(this, id, name, color);
    this.redVariant = redVariant;
    this.greenVariant = greenVariant;
    this.blueVariant = blueVariant;

    this.renderId =
    function renderId()
    {
        return 2;
    }
}

TileColorChange.prototype = Object.create(Tile.prototype);
TileColorChange.prototype.constructor = TileColorChange;
