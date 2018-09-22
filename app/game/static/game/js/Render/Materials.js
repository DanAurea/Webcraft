function Materials()
{
    this.init =
    function init()
    {
        this.tileMaterial = new THREE.MeshStandardMaterial(
        {
    		color: new THREE.Color(0xFFFFFF),
            roughness: 1,
    		shading: THREE.FlatShading,
            vertexColors: THREE.VertexColors
    	});

        this.modelMaterial = new THREE.MeshStandardMaterial(
        {
    		color: new THREE.Color(0xFFFFFF),
            roughness: 1,
    		shading: THREE.FlatShading,
            map: textures["palette"]
    	});

        this.uiModelMaterial = new THREE.MeshStandardMaterial(
        {
            map: textures["palette"],
            roughness: 1,
            shading: THREE.FlatShading
    	});

        this.uiCubeMaterial = new THREE.MeshStandardMaterial(
        {
            roughness: 1,
            shading: THREE.FlatShading
    	});
    }
}

var Materials = new Materials();
