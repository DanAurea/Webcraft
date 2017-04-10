function Tiles()
{
    this.tiles = [];
    this.placableTiles = [];

    this.init =
    function init()
    {
        //Register tiles
        this.AIR = new TileAir(0, "Air", 0xFFFFFF).setUnplacable();
        this.GRASS = new TileColorChange(1, "Grass", 0x167117, 0.15, 0.2, 0.05);
        this.DIRT = new Tile(2, "Dirt", 0x4d361f);
        this.STONE = new Tile(3, "Stone", 0x787878);
        this.SAND = new Tile(4, "Sand", 0xcdc470);
        this.LOG = new Tile(5, "Wood Log", 0x2e1b0d);
        this.LEAVES = new Tile(6, "Leaves", 0x13a825);
        this.SNOW = new TileColorChange(7, "Snow", 0xe7fafc, 0, 0, 0.1);
        this.FLOWER_RED = new TileModel(8, "Red flower", "models/flower_red.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.4, 1)).setCollisionAABB(null);
        this.FLOWER_BLUE = new TileModel(9, "Blue flower", "models/flower_blue.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.4, 1)).setCollisionAABB(null);
        this.GRASS_TALL = new TileModel(10, "Tall grass", "models/grass.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.4, 1)).setCollisionAABB(null);
		this.BEDROCK = new Tile (11, "Bedrock", 0x111111).setUnplacable().setUnbreakable();
		this.CACTUS = new TileModel(12, "Cactus", "models/cactus.obj");
        this.CAT = new TileModel(13, "Ninja Cat", "models/cat.obj").setRenderAABB(new AABB(0.15, 0.0, 0.15, 0.85, 0.6, 0.85)).setCollisionAABB(new AABB(0.15, 0.0, 0.15, 0.85, 0.6, 0.85));
		this.APPLE = new TileModel(14,"Apple", "models/apple.obj").setCollisionAABB(null);
		this.RED_MUSH = new TileModel(15,"Red Mushroom", "models/red_mush.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.4, 1)).setCollisionAABB(null);
		this.BROWN_MUSH = new TileModel(16,"Brown Mushroom", "models/brown_mush.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.4, 1)).setCollisionAABB(null);
		this.JACO_BROWNIE = new TileModel(17,"JacoBrownie", "models/Jacobrownie.obj").setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.2, 1)).setCollisionAABB(new AABB(0.0, 0.0, 0.0, 1, 0.2, 1));
        this.PENGUIN = new TileModel(18, "Penguin", "models/penguin.obj").setRenderAABB(new AABB(0.15, 0.0, 0.15, 0.85, 0.6, 0.85)).setCollisionAABB(new AABB(0.15, 0.0, 0.15, 0.85, 0.6, 0.85));
		this.SNOW_TILE = new TileBounded(19,"Snow Tile",0xe7fafc).setRenderAABB(new AABB(0.0, 0.0, 0.0, 1, 0.1, 1)).setCollisionAABB(null);
		this.DEADBUSH = new TileModel(20,"Deadbush", "models/deadbush.obj").setRenderAABB(new AABB(0.1, 0.0, 0.1, 0.9, 0.8, 0.9)).setCollisionAABB(null);
        this.PLANKS = new Tile(21,"Planks", 0xe3a553);
        this.ICE = new Tile(22,"Ice", 0xaaf7ff);
        this.RUBY = new Tile(23,"Ruby", 0xde1b00);
        this.OBSIDIAN = new Tile(24,"Obsidian", 0x723091);
        this.SAPHIR = new Tile(25,"Saphir", 0x4449cb);
        this.GOLD = new Tile(26,"Butter, definitely not gold", 0xecdd15);
        this.AMETHYST = new Tile(27,"Amethyst", 0xff1cb9);
        this.EMERALD = new Tile(28,"Emerald", 0x00b407);
        this.ORANGE = new Tile(29,"Orange block with no name", 0xffbf00);
        this.WINDOW_X = new TileModel(30,"Window X", "models/window_x.obj").setRenderAABB(new AABB(0.0, 0.0, 0.37, 1, 1, 0.63)).setCollisionAABB(new AABB(0.0, 0.0, 0.37, 1, 1, 0.63));
        this.WINDOW_Z = new TileModel(31,"Window Z", "models/window_z.obj").setRenderAABB(new AABB(0.37, 0.0, 0.0, 0.63, 1, 1)).setCollisionAABB(new AABB(0.37, 0.0, 0.0, 0.63, 1, 1));
        this.GRID_X = new TileModel(32,"Grid X", "models/grid_x.obj").setRenderAABB(new AABB(0.0, 0.0, 0.37, 1, 1, 0.63)).setCollisionAABB(new AABB(0.0, 0.0, 0.37, 1, 1, 0.63));
        this.GRID_Z = new TileModel(33,"Grid Z", "models/grid_z.obj").setRenderAABB(new AABB(0.37, 0.0, 0.0, 0.63, 1, 1)).setCollisionAABB(new AABB(0.37, 0.0, 0.0, 0.63, 1, 1));
        this.CHAIR = new TileModel(34,"Chair", "models/chair.obj").setRenderAABB(new AABB(0.12, 0.0, 0.12, 0.88, 0.63, 0.88)).setCollisionAABB(new AABB(0.12, 0.0, 0.12, 0.88, 0.63, 0.88));
        this.DOOR_BOT_X = new TileModel(35,"Door bottom X", "models/bottom_x.obj").setRenderAABB(new AABB(0.0, 0.0, 0.3, 1, 1, 0.7)).setCollisionAABB(null);
        this.DOOR_TOP_X = new TileModel(36,"Door top X", "models/top_x.obj").setRenderAABB(new AABB(0.0, 0.0, 0.3, 1, 1, 0.7)).setCollisionAABB(null);
        this.DOOR_BOT_Z = new TileModel(37,"Door bottom z", "models/bottom_z.obj").setRenderAABB(new AABB(0.30, 0.0, 0.0, 0.70, 1, 1)).setCollisionAABB(null);
        this.DOOR_TOP_Z = new TileModel(38,"Door top z", "models/top_z.obj").setRenderAABB(new AABB(0.30, 0.0, 0.0, 0.70, 1, 1)).setCollisionAABB(null);
        this.TABLE = new TileModel(39,"Table", "models/table.obj").setRenderAABB(new AABB(0.05, 0.0, 0.05, 0.95, 0.63, 0.95)).setCollisionAABB(new AABB(0.05, 0.0, 0.05, 0.95, 0.63, 0.95));
        this.FLOWER_POT = new TileModel(40,"Flower Pot", "models/flower_pot.obj").setRenderAABB(new AABB(0.4, 0.0, 0.4, 0.65, 0.65, 0.65)).setCollisionAABB(null);
    }

    this.getTile =
    function getTile(id)
    {
        return this.tiles[id];
    }
}

var Tiles = new Tiles();
