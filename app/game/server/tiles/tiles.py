class Tiles:
	size = 20
	tileList = [None] * size

class Tile:

	def __init__(self, id, name):
		## Growing list
		if(id >= Tiles.size):
			extendSize = Tiles.size * ((id - len(Tiles.tileList)) // Tiles.size + 1)
			Tiles.tileList.extend([None] * extendSize)

		## Add tiles with id passed in parameters
		Tiles.tileList[id] = self

		self.id = id
		self.name = name

	def __str__(self):
		return self.id

class Tiles:
	tileList = Tiles.tileList

	AIR = Tile(0, "Air")
	GRASS = Tile(1, "Grass")
	DIRT = Tile(2, "Dirt")
	STONE = Tile(3, "Stone")
	SAND = Tile(4, "Sand")
	LOG = Tile(5, "Log")
	LEAVES = Tile(6, "Leaves")
	SNOW = Tile(7, "Snow")
	FLOWER_RED = Tile(8, "Red flower")
	FLOWER_BLUE = Tile(9, "Blue flower")
	GRASS_TALL = Tile(10, "Tall grass")
	BEDROCK = Tile(11, "Bedrock")
	CACTUS = Tile(12, "Cactus")
	CAT = Tile(13, "Ninja cat")
	APPLE = Tile(14, "Apple")
	RED_MUSH = Tile(15, "Red mushroom")
	BROWN_MUSH = Tile(16, "Brown mushroom")
	JACO_BROWNIE = Tile(17, "JacoBrownie")
	PENGUIN = Tile(18, "Penguin")
	SNOW_TILE = Tile(19, "Snow tile")
	DEADBUSH = Tile(20, "Deadbush")
	PLANKS = Tile(21, "Planks")
	ICE = Tile(22, "Ice")
	RUBY = Tile(23, "Ruby")
	OBSIDIAN = Tile(24, "Obsidian")
	SAPHIR = Tile(25, "Saphir")
	GOLD = Tile(26, "Gold")
	AMETHYST = Tile(27, "Amethyst")
	EMERALD = Tile(28, "Emerald")
	ORANGE = Tile(29, "Orange")
	WINDOW_X = Tile(30, "Window X")
	WINDOW_Z = Tile(31, "Window Z")
	GRID_X = Tile(32, "Grid X")
	GRID_Z = Tile(33, "Grid Z")
	CHAIR = Tile(34, "Chair")
	DOOR_BOT_X = Tile(35, "Door bottom X")
	DOOR_TOP_X = Tile(36, "Door top Z")
	DOOR_BOT_Z = Tile(37, "Door bottom z")
	DOOR_TOP_Z = Tile(38, "Door top z")
	TABLE = Tile(39, "Table")
	FLOWER_POT = Tile(40, "Flower pot")

	def getTile(tileId):
		return Tiles.tileList[tileId];
