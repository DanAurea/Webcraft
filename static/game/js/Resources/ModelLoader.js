function ModelLoader()
{
    this.models = {};
    this.material = null;

    var loader = new THREE.OBJLoader();

    this.loadModel =
    function loadModel(path, finishCallback)
    {
        loader.load(path, function(object)
        {
            object.position.x += 0.5;
            object.position.z += 0.5;

            object.traverse(function(child)
            {
				if(child instanceof THREE.Mesh)
                {
					child.material.map = textures["palette"];
                    ModelLoader.material = child.material;

                    child.geometry.attributes.normal.array = new Int16Array(child.geometry.attributes.normal.array);
				}
			});

            var vertices = object.children[0].geometry.attributes.position.array;
            for(var i = 0, length = vertices.length; i < length; i++)
            {
                vertices[i] *= 0.0625;
            }

            ModelLoader.models[path] = object;
            finishCallback();
        });
    }
}

var ModelLoader = new ModelLoader();
