from opensimplex import OpenSimplex
import math, sys, random

class TreeGenerator:
	def generateAt(self,x,y,z,map):
		height = random.randint(6,9)
		
		for i in range (height):
			#leaves
			if(i>height-4):
				leaves = 1 if i == height - 1 else 2;
				for j in range(x-leaves,x+leaves+1):
					for k in range (z-leaves,z+leaves+1):
						map.setTileAt(6,j,y+i,k)
						#Snow Tile in snow biomes
						if(map.getBiomeAt(x,z)==SNOW):
							map.setTileAt(19,j,y+i+1,k)
						if(map.getBiomeAt(x,z)!=SNOW):
							#Apple
							if(i==height-3 and i!=x and k!=z):
								if(random.randint(1,10)==1):
									map.setTileAt(14,j,y+i-1,k)
							#Mushrooms
							if(height==6 and i!=x and k!=z):
								a = random.randint(1,20)
								if(a<=2):
									chunk = map.getChunkAt(j,k)
									if(chunk != None):
										map.setTileAt(14+a,j,chunk.elev[j%chunkSize][k%chunkSize],k)
			
			#Wood Log
			if(i<height-1):
				map.setTileAt(5,x,y+i,z)
					
			
				
					

class Biome:
	def __init__(self,E,id_tile):
		self.elev = E
		self.id_tile = id_tile
		
	def generate(self,map,chunk):
		...
		
class BiomePlain (Biome):
	def generate(self,map,chunk):
		rx = chunk.x * chunkSize
		rz = chunk.z * chunkSize
		## Flowers
		for i in range(random.randint(10,30)):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			t = random.randint(1,3)
			map.setTileAt(7+t,rx+cx,chunk.elev[cx][cz],rz+cz)
		## Trees
		for k in range (4,8):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			tree = TreeGenerator()
			tree.generateAt(rx+cx,chunk.elev[cx][cz],rz+cz,map)
		
			
class BiomeDesert(Biome):
	def generate(self,map,chunk):
		rx = chunk.x * chunkSize
		rz = chunk.z * chunkSize
		## Cactus
		for i in range(random.randint(3,10)):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			for j in range (random.randint(2,4)):
				map.setTileAt(12,rx+cx,chunk.elev[cx][cz]+j,rz+cz)
		#Dead Bush
		for i in range(random.randint(1,2)):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			map.setTileAt(20,rx+cx,chunk.elev[cx][cz],rz+cz)
				
class BiomeSnow(Biome):
	def generate(self,map,chunk):
		rx = chunk.x*chunkSize
		rz = chunk.z*chunkSize
		##Trees
		for k in range (4,8):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			tree = TreeGenerator()
			tree.generateAt(rx+cx,chunk.elev[cx][cz],rz+cz,map)
		##Igloo don't work yet
		if(True):#if(random.randint(1,10)>=1):
			cx = random.randint(0,31)
			cz = random.randint(0,31)
			radius = random.randint(2,3)
			while(radius > 0):
				for i in range(radius*2):
					for j in range(radius*2):
						map.setTileAt(7,rx+cx+i,chunk.elev[cx][cz]+height,rz+cz+j)
				height+=1
				radius-=1
	
DESERT = BiomeDesert(0.5,4)
SNOW = BiomeSnow(0.7,7)
OCEAN = Biome(0.1,0)
PLAIN = BiomePlain(0.3,1)

chunkSize = 32
chunkHeight = 256

class Chunk:
	def __init__(self,X,Z):
		self.x=X
		self.z=Z
		self.biome=None
		self.elev = [[0 for row in range(chunkSize)] for col in range(chunkHeight)]
		self.chunk = [0 for row in range(chunkSize*chunkSize*chunkHeight)]
		
	def getIndex4Coords(self,x,y,z):
		return y<<10|x<<5|z;
		
	def setTileAt(self,id,x,y,z):
		self.chunk[self.getIndex4Coords(x,y,z)] = id
	
	def getTileAt(self,x,y,z):
		return self.chunk[self.getIndex4Coords(x,y,z)]
		
	def setBiome(self,biome):
		self.biome = biome
		

		
class MapGenerator:
	def __init__(self):
		self.seedElev = 123456789
		self.seedMoist = 987654321
		self.seedTemp = 427227
		self.mapSize = 8
		self.genNoiseElev = OpenSimplex(self.seedElev)
		self.genNoiseMoist = OpenSimplex(self.seedMoist)
		self.genNoiseTemp = OpenSimplex(self.seedTemp)
		self.map = [[0 for row in range(self.mapSize)] for col in range(self.mapSize)]
	
	def genMap(self):
		for mx in range(self.mapSize):
			for mz in range(self.mapSize):
				self.map[mx][mz] = Chunk(mx,mz)
				self.genChunk(self.map[mx][mz])
		
				
	# def genRiver(self):
		# do nothing yet
		
	def genVegetation(self):
		
		for i in range (self.mapSize):
			for j in range(self.mapSize):
				chunk = self.getChunkAt(i*chunkSize,j*chunkSize)
				chunk.biome.generate(self,chunk)
	
	# def genVillage(self):
		# do nothing yet
	
	def getTile2Gen(self,cx,cy,cz,elev,biome):
		prof = elev-cy
		if(cy==0):
			return 11
		if(prof > 5):
			return 3
		elif(prof > 2):
			return 2
		else:
			return biome.id_tile
			
	def genChunk(self,chunk):
		biome = None
		for cx in range(chunkSize):
			rx = cx+chunk.x*chunkSize
			for cz in range(chunkSize):
				rz=cz+chunk.z*chunkSize
				sx = rx / 200
				sz = rz / 200
				biome = DESERT#self.genBiome(sx,sz)
				e = int((self.genNoiseElev.noise2d(sx,sz) / 2.0 + 0.5) * 30)
				chunk.elev[cx][cz] = e
				for y in range(e):
					chunk.setTileAt(self.getTile2Gen(cx,y,cz,e,biome),cx,y,cz)
		chunk.setBiome(biome)
		
	def getBiomeAt(self,x,z):
		chunk = self.getChunkAt(x,z)
		if(chunk != None):
			return chunk.biome
		return PLAIN
			
	def getChunkAt(self,x,z):
		if(x>=0 and z>=0 and x< self.mapSize*chunkSize and z< self.mapSize*chunkSize):
			return self.map[x>>5][z>>5]
		return None
	
	def getTileAt(self,x,y,z):
		chunk = self.getChunkAt(x,z)
		if(chunk!=None and y >= 0 and y < chunkHeight):
			return chunk.getTileAt(x%32,y,z%32)
		return 0
		
	def setTileAt(self,id,x,y,z):
		chunk = self.getChunkAt(x,z)
		if(chunk!=None and y >= 0 and y<chunkHeight):
			chunk.setTileAt(id,x%32,y,z%32)
	
	def genMoist(self,X,Z):
		return self.genNoiseMoist.noise2d(X,Z)/2.0 +0.5
		
	def genTemp(self,X,Z):
		return self.genNoiseTemp.noise2d(X,Z)/2.0 +0.5
	
	def genBiome(self,X,Z):
		m = self.genMoist(X,Z)
		t = self.genTemp(X,Z)
		return self.getBiome4MoistAndTemp(m,t)
	
	def getBiome4MoistAndTemp(self,M,T):
		if T>0.8 and M<0.2:
			return DESERT
		elif T<0.2 and M>0.7:
			return SNOW
		else:
			if M>0.9:
				return OCEAN
			else:
				return PLAIN

def genEaster(map):
	#JacoCookie
	map.setTileAt(17,int((chunkSize*map.mapSize)/2),0,int((chunkSize*map.mapSize)/2))

print("Début de la génération du relief")
map = MapGenerator()
map.genMap()
print("Fin de la génération du relief")
#map.genRiver()
print("Début de la génération de la végétation")
map.genVegetation()
print("Fin de la génération de la végétation")
#map.genVillage()
genEaster(map)
print (map.map[0][0].chunk)