function Tiles()
{
    this.tiles = Array();

    this.init =
    function init()
    {
        //Register tiles
        this.AIR = new TileAir(0, "Air", 0xFFFFFF);
        this.GRASS = new TileColorChange(1, "Grass", 0x167117, 0.15, 0.2, 0.05);
        this.DIRT = new Tile(2, "Dirt", 0x4d361f);
        this.STONE = new Tile(3, "Stone", 0x787878);
        this.SAND = new Tile(4, "Sand", 0xcdc470);
        this.LOG = new Tile(5, "Wood Log", 0x2e1b0d);
        this.LEAVES = new Tile(6, "Leaves", 0x13a825);
        this.SNOW = new TileColorChange(7, "Snow", 0xe7fafc, 0, 0, 0.1);
        this.FLOWER_RED = new TileModel(8, "Red flower", "models/flower_red.obj").setCollisionAABB(null);
        this.FLOWER_BLUE = new TileModel(9, "Blue flower", "models/flower_blue.obj").setCollisionAABB(null);
        this.GRASS_TALL = new TileModel(10, "Tall grass", "models/grass.obj").setCollisionAABB(null);
		this.BEDROCK = new Tile (11, "Bedrock", 0x111111);
		this.CACTUS = new TileModel(12, "Cactus", "models/cactus.obj");
        this.CAT = new TileModel(13, "Ninja Cat", "models/cat.obj");
		this.APPLE = new TileModel(14,"Apple", "models/apple.obj").setCollisionAABB(null);
		this.RED_MUSH = new TileModel(15,"Red Mushroom", "models/red_mush.obj").setCollisionAABB(null);
		this.BROWN_MUSH = new TileModel(16,"Brown Mushroom", "models/brown_mush.obj").setCollisionAABB(null);
		this.JACO_BROWNIE = new TileModel(17,"JacoBrownie", "models/Jacobrownie.obj");
        this.PENGUIN = new TileModel(18, "Penguin", "models/penguin.obj");
		this.SNOW_TILE = new TileBounded(19,"Snow Tile",0xe7fafc).setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.1, 1)).setCollisionAABB(null);
		/*this.DEADBUSH = new Tile(20,"Deadbush",0x000000,false,0,0,0,1,"models/deadbush.obj");
        this.PLANKS = new Tile(21,"Planks", 0xe3a553,false);
        this.ICE = new Tile(22,"Ice", 0xaaf7ff,false);
        this.RUBY = new Tile(23,"Ruby", 0xde1b00,false);
        this.OBSIDIAN = new Tile(24,"Obsidian", 0x723091,false);
        this.SAPHIR = new Tile(25,"Saphir", 0x4449cb,false);
        this.GOLD = new Tile(26,"Butter, definitely not gold", 0xecdd15,false);
        this.AMETHYST = new Tile(27,"Amethyst", 0xff1cb9,false);
        this.EMERALD = new Tile(28,"Emerald", 0x00b407,false);
        this.ORANGE = new Tile(29,"Orange block with no name", 0xffbf00,false);
        this.WINDOW_X = new Tile(30,"Window X", 0x000000,false,0,0,0,1,"models/window_x.obj");
        this.WINDOW_Z = new Tile(31,"Window Z", 0x000000,false,0,0,0,1,"models/window_z.obj");
        this.GRID_X = new Tile(32,"Grid X", 0x000000,false,0,0,0,1,"models/grid_x.obj");
        this.GRID_Z = new Tile(33,"Grid Z", 0x000000,false,0,0,0,1,"models/grid_z.obj");
        this.CHAIR = new Tile(34,"Chair", 0x000000,false,0,0,0,1,"models/chair.obj");
        this.DOOR_BOT_X = new Tile(35,"Door bottom X", 0x000000,false,0,0,0,1,"models/bottom_x.obj");
        this.DOOR_TOP_X = new Tile(36,"Door top X", 0x000000,false,0,0,0,1,"models/top_x.obj");
        this.DOOR_BOT_Z = new Tile(37,"Door bottom z", 0x000000,false,0,0,0,1,"models/bottom_z.obj");
        this.DOOR_TOP_Z = new Tile(38,"Door top z", 0x000000,false,0,0,0,1,"models/top_z.obj");
        this.TABLE = new Tile(39,"Table", 0x000000,false,0,0,0,1,"models/table.obj");
        this.FLOWER_POT = new Tile(40,"Flower Pot", 0x000000,false,0,0,0,1,"models/flower_pot.obj");*/
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
