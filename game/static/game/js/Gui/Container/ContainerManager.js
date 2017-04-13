function ContainerManager()
{
    this.openContainers = [];
    this.selectedItem = null;
    this.selectedItemMesh = null;

    this.onClick =
    function onClick()
    {
        var result = false;
        for(var i = 0, length = ContainerManager.openContainers.length; i < length; i++)
        {
            result = result || ContainerManager.openContainers[i].onClick();
        }

        if(!result)
        {
            ContainerManager.drop();
        }

        return ContainerManager.openContainers.length != 0;
    }

    this.open =
    function open(container)
    {
        ContainerManager.openContainers.push(container);
    }

    this.close =
    function close(container)
    {
        var id = ContainerManager.openContainers.indexOf(container);
        if(id != -1)
        {
            ContainerManager.openContainers.splice(id, 1);
        }
    }

    this.take =
    function take(itemId)
    {
        ContainerManager.selectedItem = itemId;
        Gui3DHelper.clearUI("sys-container");
        var saveName = Gui3DHelper.uiName;
        Gui3DHelper.setUIName("sys-container");
        ContainerManager.selectedItemMesh = Gui3DHelper.renderTile(itemId, mouseX, mouseY);
        ContainerManager.selectedItemMesh.material.depthFunc = THREE.NeverDepth;
        Gui3DHelper.setUIName(saveName);
    }

    this.drop =
    function drop()
    {
        ContainerManager.selectedItem = null;
        ContainerManager.selectedItemMesh = null;
        Gui3DHelper.clearUI("sys-container");
    }

    this.hasItem =
    function hasItem()
    {
        return ContainerManager.selectedItem != null;
    }

    this.updatePos =
    function updatePos()
    {
        if(ContainerManager.selectedItemMesh != null)
        {
            ContainerManager.selectedItemMesh.position.set(MouseUtil.mouseX, MouseUtil.mouseY, -50);
        }
    }
}

var ContainerManager = new ContainerManager();
