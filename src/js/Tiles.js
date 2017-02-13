function Tile(id, color, colorChange, redVariant, greenVariant, blueVariant, model)
{
    Tiles.tiles[id] = this;
    this.id = id;
    this.color = color;
    this.colorChange = colorChange;
    this.redVariant = (typeof redVariant === "undefined") ? 0.1 : redVariant;
    this.greenVariant = (typeof greenVariant === "undefined") ? 0.1 : greenVariant;
    this.blueVariant = (typeof blueVariant === "undefined") ? 0.1 : blueVariant;
    this.model = (typeof model === "undefined") ? null : model;

    this.isVisible =
    function isVisible()
    {
        return this != Tiles.AIR;
    }

    this.isSimpleCube =
    function isSimpleCube()
    {
        return this.model == null;
    }

    this.isSideVisible =
    function isSideVisible(otherTile)
    {
        return !otherTile.isVisible() || !otherTile.isSimpleCube();
    }

    this.getAABB =
    function getAABB(x, y, z)
    {
        return this.isSimpleCube() ? new AABB(x, y, z, x + 1, y + 1, z + 1) : null;
    }
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
        this.STONE = new Tile(3, 0x787878, false);
        this.SAND = new Tile(4, 0xFFFCAC, false);
        this.LOG = new Tile(5, 0x2e1b0d, false);
        this.LEAVES = new Tile(6, 0x0c5b16, false);
        this.FLOWER_RED = new Tile(7, 0x0c5b16, false, 0, 0, 0, "models/flower.obj");
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
Tiles.init();
