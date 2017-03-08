function Tile(id, name, color, colorChange, redVariant, greenVariant, blueVariant, model)
{
    Tiles.tiles[id] = this;
    this.id = id;
    this.name = name;
    this.color = color;
    this.colorChange = colorChange;
    this.redVariant = (typeof redVariant === "undefined") ? 0.1 : redVariant;
    this.greenVariant = (typeof greenVariant === "undefined") ? 0.1 : greenVariant;
    this.blueVariant = (typeof blueVariant === "undefined") ? 0.1 : blueVariant;
    this.model = (typeof model === "undefined") ? null : (gameFolder + model);
    console.log(gameFolder);

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
    this.tiles = Array();

    this.init =
    function init()
    {
        //Register tiles
        this.AIR = new Tile(0, "Air", 0xFFFFFF, false);
        this.GRASS = new Tile(1, "Grass", 0x16712D, true, 0.15, 0.15, 0.1);
        this.DIRT = new Tile(2, "Dirt", 0x543E28, false);
        this.STONE = new Tile(3, "Stone", 0x787878, false);
        this.SAND = new Tile(4, "Sand", 0xFFFCAC, false);
        this.LOG = new Tile(5, "Wood Log", 0x2e1b0d, false);
        this.LEAVES = new Tile(6, "Leaves", 0x0c5b16, false);
        this.SNOW = new Tile(7, "Snow", 0xe7fafc, false);
        this.FLOWER_RED = new Tile(8, "Red flower", 0x000000, false, 0, 0, 0, "models/flower_red.obj");
        this.FLOWER_BLUE = new Tile(9, "Blue flower", 0x000000, false, 0, 0, 0, "models/flower_blue.obj");
        this.GRASS_TALL = new Tile(10, "Tall grass", 0x000000, false, 0, 0, 0, "models/grass.obj");
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
Tiles.init();
