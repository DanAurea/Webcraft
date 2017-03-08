var ingameGui = {
    onIngameGuiOpen: function(gui)
    {
        gui.find("#ingame_gui_version").text("V: " + VERSION);
    },

    onIngameGuiUpdate: function(gui)
    {
        gui.find("#ingame_gui_block").text("Tile : " + Tiles.getTile(FPSCamera.tileId).name);
    }
};
