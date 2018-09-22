var ingameGui =
{
    gamepadCursor: null,
    barCursor: null,
    container: null,

    ingameGuiOpen: function(firstOpen)
    {
        Gui3DHelper.clearUI("ingame");
        Gui3DHelper.setUIName("ingame");
        Gui3DHelper.initLight();

        ContainerManager.close(ingameGui.container);
        ingameGui.container = new Container(width / 2, 27, 468, 54);
        for(var i = 0; i < 10; i++)
        {
            ingameGui.container.slots.push(new SlotHotbar(null, width / 2 - 198 + i * 44, 22, i));
        }

        ingameGui.gamepadCursor = Gui3DHelper.renderQuad(width / 2, height / 2, 1, 16, 16, textures["gamepad_pointer"], 0, 0, 16, 16);
        Gui3DHelper.renderQuad(width / 2, height / 2, -999, 16, 16, textures["cross"], 0, 0, 32, 32);
        Gui3DHelper.renderQuad(width / 2, 0, -999, 468, 54, textures["inventory"], 0, 0, 234, 27, Anchors.CENTER_BOTTOM, Anchors.CENTER_BOTTOM);
        ingameGui.barCursor = Gui3DHelper.renderQuad(width / 2 - 198, 47, -998, 14, 8, textures["inventory"], 0, 27, 7, 31, Anchors.CENTER_BOTTOM, Anchors.CENTER_BOTTOM);
    },

    ingameGuiUpdate: function()
    {
        if(GamePadControls.gamepadEnabled && !MouseUtil.isLocked)
        {
            ingameGui.gamepadCursor.position.set(MouseUtil.mouseX,MouseUtil.mouseY,0);
        }
        else
        {
            ingameGui.gamepadCursor.position.set(0,0,1);
        }

        for(var i = 0; i < 10; i++)
        {
            ingameGui.container.slots[i].itemId = Tiles.getTile(thePlayer.inventory[i]);
        }
        Gui3DHelper.setUIName("ingame");
        ingameGui.container.render();
        ingameGui.barCursor.position.x = width / 2 - 198 + thePlayer.handIndex * 44;
    },

    ingameGuiClose: function()
    {
        Gui3DHelper.clearUI("ingame");
    },
};
