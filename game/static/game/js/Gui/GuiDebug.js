var debugGui = {
    onDebugGuiUpdate: function()
    {
        var debugGui = gui.find("#debugGuiInternal")
        debugGui.text("V: " + VERSION);
        debugGui.append("<br/>FPS: " + TimeManager.fps);
        debugGui.append("<br/>Position: " + parseInt(thePlayer.x) + "," + parseInt(thePlayer.y) + "," + parseInt(thePlayer.z));
        debugGui.append("<br/>Looking at: ");
        if(FPSCamera.targetTile != null)
        {
            debugGui.append(FPSCamera.targetTile.x + "," + FPSCamera.targetTile.y + "," + FPSCamera.targetTile.z);
        }
        else
        {
            debugGui.append("Nothing");
        }
        debugGui.append("<br/>Camera Yaw:" + parseInt(thePlayer.yaw) + " Pitch:" + parseInt(thePlayer.pitch))

        var totalMinutes = parseInt(((World.time % World.dayDuration) / World.dayDuration) * 24 * 60);
        var hours = parseInt(totalMinutes / 60);
        var minutes = totalMinutes % 60;
        debugGui.append("<br/>Time: " + (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes));
    }
};
