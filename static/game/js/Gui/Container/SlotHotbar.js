function SlotHotbar(tileId, x, y, index)
{
    Slot.call(this, tileId, x, y);


    this.onChange =
    function onChange()
    {
        thePlayer.inventory[index] = this.itemId != null ? this.itemId.id : null;
    }
}

SlotHotbar.prototype = Object.create(Slot.prototype);
SlotHotbar.prototype.constructor = SlotHotbar;
