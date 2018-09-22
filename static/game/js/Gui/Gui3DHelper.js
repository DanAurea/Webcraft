function Gui3DHelper()
{
    this.uiName = "";

    this.initLight =
    function initLight()
    {
        var ambiant = new THREE.AmbientLight(0x000000);
        ambiant.uiName = this.uiName;
        uiScene.add(ambiant);
        var sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
        sunLight.uiName = this.uiName;
		sunLight.color.setHSL(0.1, 1, 0.95);
		sunLight.position.set(0.0, 0.2, 0.5);
		uiScene.add(sunLight);
    }

    this.renderQuad =
    function renderQuad(x, y, z, w, h, texture, sX, sY, sW, sH, externalAnchor, internalAnchor)
    {
        var material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
        var plane = new THREE.PlaneGeometry(w, h);
        var mesh = new THREE.Mesh(plane, material);
        Anchors.setPosFromAnchor(mesh, x, y, z, w, h, externalAnchor, internalAnchor);
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

    this.renderQuadColor =
    function renderQuadColor(x, y, z, w, h, color, opacity, externalAnchor, internalAnchor)
    {
        var material = new THREE.MeshBasicMaterial({color: color, transparent: true, opacity: opacity});
        var plane = new THREE.PlaneGeometry(w, h);
        var mesh = new THREE.Mesh(plane, material);
        Anchors.setPosFromAnchor(mesh, x, y, z, w, h, externalAnchor, internalAnchor);
        mesh.uiName = this.uiName;

        uiScene.add(mesh);

        return mesh;
    }

    this.renderOutline =
    function renderOutline(x, y, z, w, h, cornerSize, texture, sX, sY, scale, externalAnchor, internalAnchor)
    {
        var groupGeometry = new THREE.Object3D();
        //Bottom left
        groupGeometry.add(Gui3DHelper.renderQuad(x, y, z, cornerSize * scale, cornerSize * scale, texture, sX, sY, sX + cornerSize, sY + cornerSize, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));
        //Bottom right
        groupGeometry.add(Gui3DHelper.renderQuad(x + w - cornerSize * scale, y, z, cornerSize * scale, cornerSize * scale, texture, sX + cornerSize * 2, sY, sX + cornerSize * 3, sY + cornerSize, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));
        //Top left
        groupGeometry.add(Gui3DHelper.renderQuad(x, y + h - cornerSize * scale, z, cornerSize * scale, cornerSize * scale, texture, sX, sY + cornerSize * 2, sX + cornerSize, sY + cornerSize * 3, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));
        //Top right
        groupGeometry.add(Gui3DHelper.renderQuad(x + w - cornerSize * scale, y + h - cornerSize * scale, z, cornerSize * scale, cornerSize * scale, texture, sX + cornerSize * 2, sY + cornerSize * 2, sX + cornerSize * 3, sY + cornerSize * 3, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        //Bottom line
        groupGeometry.add(Gui3DHelper.renderQuad(x + cornerSize * scale, y, z, w - cornerSize * 2 * scale, cornerSize * scale, texture, sX + cornerSize, sY, sX + cornerSize * 2, sY + cornerSize, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        //Top line
        groupGeometry.add(Gui3DHelper.renderQuad(x + cornerSize * scale, y + h - cornerSize * scale, z, w - cornerSize * 2 * scale, cornerSize * scale, texture, sX + cornerSize, sY + cornerSize * 2, sX + cornerSize * 2, sY + cornerSize * 3, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        //Left line
        groupGeometry.add(Gui3DHelper.renderQuad(x, y + cornerSize * scale, z, cornerSize * scale, h - cornerSize * 2 * scale, texture, sX, sY + cornerSize, sX + cornerSize, sY + cornerSize * 2, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        //Right line
        groupGeometry.add(Gui3DHelper.renderQuad(x + w - cornerSize * scale, y + cornerSize * scale, z, cornerSize * scale, h - cornerSize * 2 * scale, texture, sX + cornerSize * 2, sY + cornerSize, sX + cornerSize * 3, sY + cornerSize * 2, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        //Center
        groupGeometry.add(Gui3DHelper.renderQuad(x + cornerSize * scale, y + cornerSize * scale, z, w - cornerSize * 2 * scale, h - cornerSize * 2 * scale, texture, sX + cornerSize, sY + cornerSize, sX + cornerSize * 2, sY + cornerSize * 2, Anchors.CENTER_CENTER, Anchors.LEFT_BOTTOM));

        for(var i = 0; i < 9; i++)
        {
            uiScene.remove(groupGeometry.children[i]);
        }

        Anchors.setPosFromAnchor(groupGeometry, -w / 2, -h / 2, 0, w, h, externalAnchor, internalAnchor);

        uiScene.add(groupGeometry);
        groupGeometry.uiName = this.uiName;

        return groupGeometry;
    }

    this.renderTile =
    function renderTile(tile, x, y, externalAnchor, internalAnchor)
    {
        if(tile.renderId() < 4 && tile.renderId() > 0)
        {
            var aabb = tile.normalizedRenderBox;

            var nX = (aabb.x + (aabb.x2 - aabb.x) / 2) * 28 - 14;
            var nY = (aabb.y + (aabb.y2 - aabb.y) / 2) * 28 - 14;

            return this.renderCube(x + nX, y + nY, -500, 20, 45, 0, 28 * (aabb.x2 - aabb.x), 28 * (aabb.y2 - aabb.y), 28 * (aabb.z2 - aabb.z), tile.color, externalAnchor, internalAnchor);
        }
        else if(tile.renderId() == 4)
        {
            return this.renderModel(x, y - 13, -500, 20, 225, 0, 28, 28, 28, ModelLoader.models[tile.model], externalAnchor, internalAnchor);
        }
    }

    this.renderCube =
    function renderCube(x, y, z, rX, rY, rZ, sX, sY, sZ, color, externalAnchor, internalAnchor)
    {
        var material = Materials.uiCubeMaterial.clone();
        material.color = new THREE.Color(color);
        var cube = new THREE.CubeGeometry(1, 1, 1);
        var mesh = new THREE.Mesh(cube, material);
        mesh.position.set(x, y, z);
        Anchors.setPosFromAnchor(mesh, x, y, z, sX, sY, externalAnchor, internalAnchor);
        mesh.rotation.set(MathUtil.toRadians(rX), MathUtil.toRadians(rY), MathUtil.toRadians(rZ));
        mesh.scale.set(sX, sY, sZ);
        mesh.uiName = this.uiName;

        uiScene.add(mesh);

        return mesh;
    }

    this.renderModelWithPath =
    function renderModelWithPath(x, y, z, rX, rY, rZ, sX, sY, sZ, modelPath, externalAnchor, internalAnchor)
    {
        return this.renderModel(x, y, z, rX, rY, rZ, sX, sY, sZ, ModelLoader.models[gameFolder + "models/" + modelPath + ".obj"], externalAnchor, internalAnchor);
    }

    this.renderModel =
    function renderModel(x, y, z, rX, rY, rZ, sX, sY, sZ, paramModel, externalAnchor, internalAnchor)
    {
        var model = paramModel.clone();
        model.material = Materials.uiModelMaterial.clone();
        model.children[0].material = Materials.uiModelMaterial.clone();
        Anchors.setPosFromAnchor(model, x, y, z, sX, sY, externalAnchor, internalAnchor);
        model.rotation.set(MathUtil.toRadians(rX), MathUtil.toRadians(rY), MathUtil.toRadians(rZ));
        model.scale.set(sX, sY, sZ);

        model.uiName = this.uiName;
        uiScene.add(model);

        return model;
    }

    this.renderBackground =
    function renderBackground()
    {
        return Gui3DHelper.renderQuadColor(width / 2, height / 2, -1000, width, height, new THREE.Color(0x000000), 0.5, Anchors.CENTER_CENTER, Anchors.CENTER_CENTER);
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
