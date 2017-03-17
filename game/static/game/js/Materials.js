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
    }
}

var Materials = new Materials();
