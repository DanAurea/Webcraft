function SlotInfinite(tileId, x, y)
{
    Slot.call(this, tileId, x, y);

    this.onClick =
    function onClick()
    {
        if(this.itemId != null && !ContainerManager.hasItem())
        {
            ContainerManager.take(this.itemId);
        }
        else if(ContainerManager.hasItem())
        {
            ContainerManager.drop(this.itemId);
        }
    }

    this.isHovered =
    function isHovered()
    {
        return MouseUtil.mouseX >= this.x - 22 && MouseUtil.mouseX < this.x + 22 && MouseUtil.mouseY >= this.y - 22 && MouseUtil.mouseY < this.y + 22;
    }
}

SlotInfinite.prototype = Object.create(Slot.prototype);
SlotInfinite.prototype.constructor = SlotInfinite;
