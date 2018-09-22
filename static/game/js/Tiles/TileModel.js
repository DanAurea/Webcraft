function TileModel(id, name, model)
{
    TileBounded.call(this, id, name, 0x000000);
    this.model = gameFolder + model;

    this.renderId =
    function renderId()
    {
        return 4;
    }

    this.isOppositeVisible =
    function isOppositeVisible(side, self)
    {
        return true;
    }
}

TileModel.prototype = Object.create(TileBounded.prototype);
TileModel.prototype.constructor = TileModel;
