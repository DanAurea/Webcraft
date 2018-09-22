function TileAir(id, name, color)
{
    Tile.call(this, id, name, color);

    this.renderId =
    function renderId()
    {
        return 0;
    }
}

TileAir.prototype = Object.create(Tile.prototype);
TileAir.prototype.constructor = TileAir;
