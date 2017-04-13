var inventoryGui = {
    container: null,

    inventoryGuiOpen: function(firstOpen)
    {
        MouseUtil.releasePointer();
        Gui3DHelper.clearUI("inventory");
        Gui3DHelper.setUIName("inventory");
        Gui3DHelper.renderBackground();

        var placableTiles = Tiles.placableTiles;
        var column = parseInt(placableTiles.length / 10) + 1;

        ContainerManager.close(inventoryGui.container);
        inventoryGui.container = new Container(width / 2, height / 2, 530, column * 50 + 32);
        ContainerManager.open(inventoryGui.container);
        ContainerManager.open(ingameGui.container);

        var playerModel = Gui3DHelper.renderModelWithPath(width - 75, height - 100, -150, 20, 225, 0, 150, 150, 150, thePlayer.avatar);
        for(var i = 0, length = placableTiles.length; i < length; i++)
        {
            var x = width / 2 - 225 + (i % 10) * 50;
            var y = height / 2 + (column * 50 + 32) / 2 - parseInt(i / 10) * 50 - 41;
            Gui3DHelper.renderQuad(x, y, -998, 52, 52, textures["inventory"], 24, 230, 50, 256);
            inventoryGui.container.slots.push(new SlotInfinite(Tiles.getTile(placableTiles[i].id), x, y));
        }

        Gui3DHelper.renderOutline(width / 2, height / 2, - 999, 530, column * 50 + 32, 8, textures["inventory"], 0, 232, 2);
    },

    inventoryGuiUpdate: function()
    {
        Gui3DHelper.setUIName("inventory");
        inventoryGui.container.render();
    },

    inventoryGuiClose: function()
    {
        Gui3DHelper.clearUI("inventory");
        ContainerManager.close(inventoryGui.container);
        ContainerManager.close(ingameGui.container);
        MouseUtil.attachPointer();
    },
};
