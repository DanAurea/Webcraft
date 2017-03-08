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
    }
}

var Materials = new Materials();
