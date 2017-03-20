var ingameGui = {
    onIngameGuiOpen: function(gui)
    {
        gui.find("#ingame_gui_version").text("V: " + VERSION);
    },

    onIngameGuiUpdate: function(gui)
    {
        gui.find("#ingame_gui_block").text("Tile: " + Tiles.getTile(FPSCamera.tileId).name);

        var totalMinutes = parseInt(((MapManager.time % MapManager.dayDuration) / MapManager.dayDuration) * 24 * 60);
        var hours = parseInt(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        gui.find("#ingame_gui_time").text("Time: " + (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes));
    }
};
