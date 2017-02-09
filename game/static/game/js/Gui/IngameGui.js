var ingameGui = {
    onIngameGuiOpen: function(gui)
    {
        gui.find("#ingame_gui_version").text("V: " + VERSION);
    }
};
