function ModelLoader()
{
    this.models = {};

    var loader = new THREE.OBJLoader();

    this.loadModel =
    function loadModel(path)
    {
        loader.load(path, function(object)
        {
            object.position.x += 0.5;
            object.position.z += 0.5;
            object.scale.x = 0.0625;
            object.scale.y = 0.0625;
            object.scale.z = 0.0625;

            object.traverse(function(child)
            {
				if(child instanceof THREE.Mesh)
                {
					child.material.map = textures["palette"];
				}
			});

            ModelLoader.models[path] = object;
        });
    }
}

var ModelLoader = new ModelLoader();
