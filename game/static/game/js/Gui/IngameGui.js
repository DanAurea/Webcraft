var ingameGui = {
    onIngameGuiOpen: function(gui)
    {
        gui.find("#ingame_gui_version").text("V: " + VERSION);
        gui.find("#ingame_gui_block").text("Tile : " + FPSCamera.tileId);
    },

    onIngameGuiUpdate: function(gui)
    {
        gui.find("#ingame_gui_block").text("Tile : " + FPSCamera.tileId);
    }
};
