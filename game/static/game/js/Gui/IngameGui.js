var ingameGui = {
    onIngameGuiOpen: function(gui)
    {
        gui.find("#ingame_gui_version").text("V: " + VERSION);
        gui.find("#GPU").text("GPU: " + GPU);
    },

    onIngameGuiUpdate: function(gui)
    {
        gui.find("#ingame_gui_block").text("Tile : " + Tiles.getTile(FPSCamera.tileId).name);
    }
};
