function Tile(id, name, color, colorChange, redVariant, greenVariant, blueVariant, height, model)
{
    Tiles.tiles[id] = this;
    this.id = id;
    this.name = name;
    this.color = color;
    this.colorChange = colorChange;
    this.redVariant = (typeof redVariant === "undefined") ? 0.1 : redVariant;
    this.greenVariant = (typeof greenVariant === "undefined") ? 0.1 : greenVariant;
    this.blueVariant = (typeof blueVariant === "undefined") ? 0.1 : blueVariant;
	this.height = (typeof height === "undefined") ? 1 : height;
    this.model = (typeof model === "undefined") ? null : (gameFolder + model);

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
        return !otherTile.isVisible() || !otherTile.isSimpleCube() || otherTile.height < this.height;
    }

    this.getAABB =
    function getAABB(x, y, z)
    {
        return this.isSimpleCube() ? new AABB(x, y, z, x + 1, y + this.height, z + 1) : null;
    }

	this.getRenderAABB =
	function getRenderAABB(x,y,z)
	{
		return new AABB(x, y, z, x + 1, y + this.height, z + 1);
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
        this.SNOW = new Tile(7, "Snow", 0xe7fafc, true, 0,0,0.1);
        this.FLOWER_RED = new Tile(8, "Red flower", 0x000000, false, 0, 0, 0, 0.3, "models/flower_red.obj");
        this.FLOWER_BLUE = new Tile(9, "Blue flower", 0x000000, false, 0, 0, 0, 0.3, "models/flower_blue.obj");
        this.GRASS_TALL = new Tile(10, "Tall grass", 0x000000, false, 0, 0, 0, 0.3, "models/grass.obj");
		this.BEDROCK = new Tile (11, "Bedrock",0x000000,false);
		this.CACTUS = new Tile(12, "Cactus", 0x000000, false, 0, 0, 0, 1, "models/cactus.obj");
		this.CAT = new Tile(13,"Ninja Cat",0x000000,false,0,0,0, 1,"models/cat.obj");
		this.APPLE = new Tile(14,"Apple",0x000000,false,0,0,0,1,"models/apple.obj");
		this.RED_MUSH = new Tile(15,"Red Mushroom", 0x000000, false, 0, 0, 0,0.3,"models/red_mush.obj");
		this.BROWN_MUSH = new Tile(16,"Brown Mushroom", 0x000000, false, 0, 0, 0,0.3,"models/brown_mush.obj");
		this.JACO_BROWNIE = new Tile(17,"JacoBrownie",0x000000,false,0,0,0,0.5,"models/Jacobrownie.obj");
		this.PENGUIN = new Tile(18,"Penguin",0x000000,false,0,0,0,1,"models/penguin.obj");
		this.SNOW_TILE = new Tile(19,"Snow Tile",0xe7fafc,true,0,0,0.1,0.1);
		this.DEADBUSH = new Tile(20,"Deadbush",0x000000,false,0,0,0,1,"models/deadbush.obj");
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
Tiles.init();
