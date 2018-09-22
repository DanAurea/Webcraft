function Slot(tileId, x, y)
{
    this.itemId = tileId;
    this.lastId = -100;
    this.mesh = null;
    this.x = x;
    this.y = y;
    this.hoverEffect = Gui3DHelper.renderQuadColor(this.x, this.y, -100, 44, 44, new THREE.Color(0xFFFFFF), 0.25);
    this.hoverEffect.visible = false;

    this.render =
    function render()
    {
        if(this.itemId != this.lastId)
        {
            this.lastId = this.itemId;
            if(this.mesh != null)
            {
                uiScene.remove(this.mesh);
            }

            if(this.itemId != null)
            {
                this.mesh = Gui3DHelper.renderTile(this.itemId, this.x, this.y);
            }
        }
        this.hoverEffect.visible = this.isHovered();
    }

    this.onClick =
    function onClick()
    {
        if(this.itemId != null && !ContainerManager.hasItem())
        {
            ContainerManager.take(this.itemId);
            this.itemId = null;
            this.onChange();
        }
        else if(this.itemId == null && ContainerManager.hasItem())
        {
            this.itemId = ContainerManager.selectedItem;
            ContainerManager.drop();
            this.onChange();
        }
        else if(this.itemId != null && ContainerManager.hasItem())
        {
            var swap = this.itemId;
            this.itemId = ContainerManager.selectedItem;
            ContainerManager.drop();
            ContainerManager.take(swap);
            this.onChange();
        }
    }

    this.isHovered =
    function isHovered()
    {
        return MathUtil.pointInRectangle(MouseUtil.mouseX, MouseUtil.mouseY, this.x - 22, this.y - 22, 44, 44);
    }

    this.onChange =
    function onChange(){}
}
