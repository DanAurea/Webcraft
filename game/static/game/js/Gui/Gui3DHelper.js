function Gui3DHelper()
{
    this.uiName = "";

    this.initLight =
    function initLight()
    {
        var ambiant = new THREE.AmbientLight(0x111111);
        ambiant.uiName = this.uiName;
        uiScene.add(ambiant);
        var sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        sunLight.uiName = this.uiName;
		sunLight.color.setHSL(0.1, 1, 0.95);
		sunLight.position.set(0.0, 0.2, 0.5);
		sunLight.position.multiplyScalar(1);
		uiScene.add(sunLight);
    }

    this.renderQuad =
    function renderQuad(x, y, z, width, height, texture, sX, sY, sW, sH)
    {
        var material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
        var plane = new THREE.PlaneGeometry(width, height);
        var mesh = new THREE.Mesh(plane, material);
        mesh.position.set(x, y, z);
        mesh.uiName = this.uiName;

        var uvs = plane.faceVertexUvs[0];
        sX /= texture.image.width;
        sW /= texture.image.width;
        sY /= texture.image.height;
        sH /= texture.image.height;

        uvs[0][0].set(sX, sH);
        uvs[0][1].set(sX, sY);
        uvs[0][2].set(sW, sH);
        uvs[1][0].set(sX, sY);
        uvs[1][1].set(sW, sY);
        uvs[1][2].set(sW, sH);


        uiScene.add(mesh);

        return mesh;
    }

    this.renderQuadFromOrigin =
    function renderQuadFromOrigin(x, y, z, width, height, texture, sX, sY, sW, sH)
    {
        var quad = Gui3DHelper.renderQuad(x, y, z, width, height, texture, sX, sY, sW, sH);
        quad.position.set(x + width / 2, y + height / 2, z);

        return quad;
    }

    this.renderQuadColor =
    function renderQuadColor(x, y, z, width, height, color, opacity)
    {
        var material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
        var plane = new THREE.PlaneGeometry(width, height);
        var mesh = new THREE.Mesh(plane, material);
        mesh.position.set(x, y, z);
        mesh.uiName = this.uiName;

        uiScene.add(mesh);

        return mesh;
    }

    this.renderOutline =
    function renderOutline(x, y, z, width, height, cornerSize, texture, sX, sY, scale)
    {
        var groupGeometry = new THREE.Object3D();
        //Bottom left
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x, y, z, cornerSize * scale, cornerSize * scale, texture, sX, sY, sX + cornerSize, sY + cornerSize));
        //Bottom right
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + width - cornerSize * scale, y, z, cornerSize * scale, cornerSize * scale, texture, sX + cornerSize * 2, sY, sX + cornerSize * 3, sY + cornerSize));
        //Top left
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x, y + height - cornerSize * scale, z, cornerSize * scale, cornerSize * scale, texture, sX, sY + cornerSize * 2, sX + cornerSize, sY + cornerSize * 3));
        //Top right
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + width - cornerSize * scale, y + height - cornerSize * scale, z, cornerSize * scale, cornerSize * scale, texture, sX + cornerSize * 2, sY + cornerSize * 2, sX + cornerSize * 3, sY + cornerSize * 3));

        //Bottom line
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + cornerSize * scale, y, z, width - cornerSize * 2 * scale, cornerSize * scale, texture, sX + cornerSize, sY, sX + cornerSize * 2, sY + cornerSize));

        //Top line
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + cornerSize * scale, y + height - cornerSize * scale, z, width - cornerSize * 2 * scale, cornerSize * scale, texture, sX + cornerSize, sY + cornerSize * 2, sX + cornerSize * 2, sY + cornerSize * 3));

        //Left line
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x, y + cornerSize * scale, z, cornerSize * scale, height - cornerSize * 2 * scale, texture, sX, sY + cornerSize, sX + cornerSize, sY + cornerSize * 2));

        //Right line
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + width - cornerSize * scale, y + cornerSize * scale, z, cornerSize * scale, height - cornerSize * 2 * scale, texture, sX + cornerSize * 2, sY + cornerSize, sX + cornerSize * 3, sY + cornerSize * 2));

        //Center
        groupGeometry.add(Gui3DHelper.renderQuadFromOrigin(x + cornerSize * scale, y + cornerSize * scale, z, width - cornerSize * 2 * scale, height - cornerSize * 2 * scale, texture, sX + cornerSize, sY + cornerSize, sX + cornerSize * 2, sY + cornerSize * 2));

        for(var i = 0; i < 9; i++)
        {
            uiScene.remove(groupGeometry.children[i]);
        }

        groupGeometry.position.set(-width / 2, -height / 2, 0);
        uiScene.add(groupGeometry);
        groupGeometry.uiName = this.uiName;

        return groupGeometry;
    }

    this.renderTile =
    function renderTile(tile, x, y)
    {
        if(tile.renderId() < 4 && tile.renderId() > 0)
        {
            var aabb = tile.normalizedRenderBox;

            //this.hoverMesh.position.set(this.targetTile.x + aabb.x + this.hoverMesh.scale.x / 2, this.targetTile.y + aabb.y + this.hoverMesh.scale.y / 2, this.targetTile.z + aabb.z + this.hoverMesh.scale.z / 2);
            var nX = (aabb.x + (aabb.x2 - aabb.x) / 2) * 28 - 14;
            var nY = (aabb.y + (aabb.y2 - aabb.y) / 2) * 28 - 14;

            return this.renderCube(x + nX, y + nY, -500, 20, 45, 0, 28 * (aabb.x2 - aabb.x), 28 * (aabb.y2 - aabb.y), 28 * (aabb.z2 - aabb.z), tile.color);
        }
        else if(tile.renderId() == 4)
        {
            return this.renderModel(x, y - 13, -500, 20, 225, 0, 28, 28, 28, ModelLoader.models[tile.model]);
        }
    }

    this.renderCube =
    function renderCube(x, y, z, rX, rY, rZ, sX, sY, sZ, color)
    {
        var material = Materials.uiCubeMaterial.clone();
        material.color = new THREE.Color(color);
        var cube = new THREE.CubeGeometry(1, 1, 1);
        var mesh = new THREE.Mesh(cube, material);
        mesh.position.set(x, y, z);
        mesh.rotation.set(MathUtil.toRadians(rX), MathUtil.toRadians(rY), MathUtil.toRadians(rZ));
        mesh.scale.set(sX, sY, sZ);
        mesh.uiName = this.uiName;

        uiScene.add(mesh);

        return mesh;
    }

    this.renderModelWithPath =
    function renderModelWithPath(x, y, z, rX, rY, rZ, sX, sY, sZ, modelPath)
    {
        return this.renderModel(x, y, z, rX, rY, rZ, sX, sY, sZ, ModelLoader.models[gameFolder + "models/" + modelPath + ".obj"]);
    }

    this.renderModel =
    function renderModel(x, y, z, rX, rY, rZ, sX, sY, sZ, paramModel)
    {
        var model = paramModel.clone();
        model.material = Materials.uiModelMaterial.clone();
        model.children[0].material = Materials.uiModelMaterial.clone();
        model.position.set(x, y, z);
        model.rotation.set(MathUtil.toRadians(rX), MathUtil.toRadians(rY), MathUtil.toRadians(rZ));
        model.scale.set(sX, sY, sZ);

        model.uiName = this.uiName;
        uiScene.add(model);

        return model;
    }

    this.renderBackground =
    function renderBackground()
    {
        return Gui3DHelper.renderQuadColor(width / 2, height / 2, -1000, width, height, new THREE.Color(0x000000), 0.5);
    }

    this.setUIName =
    function setUIName(uiName)
    {
        this.uiName = uiName;
    }

    this.clearUI =
    function clearUI(uiName)
    {
        var rI = 0;
        for(var i = 0, length = uiScene.children.length; i < length; i++)
        {
            if(uiScene.children[rI].uiName == uiName)
            {
                uiScene.remove(uiScene.children[rI]);
                rI--;
            }
            rI++;
        }
    }
}

var Gui3DHelper = new Gui3DHelper();
