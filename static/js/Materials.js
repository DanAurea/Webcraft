function Materials()
{
    this.toonMaterial = new THREE.MeshToonMaterial(
    {
		color: new THREE.Color(0xFFFFFF),
		specular: new THREE.Color(0xFFFFFF),
		shininess: 1,
		shading: THREE.SmoothShading,
        vertexColors: THREE.VertexColors
	});
}

var Materials = new Materials();
