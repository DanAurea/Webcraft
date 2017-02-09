function Tile(id, color, colorChange, redVariant, greenVariant, blueVariant)
{
    Tiles.tiles[id] = this;
    this.id = id;
    this.color = color;
    this.colorChange = colorChange;
    this.redVariant = (typeof redVariant === "undefined") ? 0.1 : redVariant;
    this.greenVariant = (typeof greenVariant === "undefined") ? 0.1 : greenVariant;
    this.blueVariant = (typeof blueVariant === "undefined") ? 0.1 : blueVariant;
}

function Tiles()
{
    this.tiles = Array(20);

    this.init =
    function init()
    {
        //Register tiles
        this.AIR = new Tile(0, 0xFFFFFF, false);
        this.GRASS = new Tile(1, 0x16712D, true, 0.15, 0.15, 0.1);
        this.DIRT = new Tile(2, 0x543E28, false);
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
Tiles.init();
