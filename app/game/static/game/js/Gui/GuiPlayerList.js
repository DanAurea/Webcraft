var playerListGui = {
    onPlayerListGuiUpdate: function(gui)
    {
        var playerList = gui.find("#playerListGui_playerList");
        playerList.text("");
        for(var i = 0, length = Entities.entityList.length; i < length; i++)
        {
            var entity = Entities.entityList[i];
            if(entity instanceof EntityPlayer)
            {
                playerList.append(entity.username + "<br/>");
            }
        }
    }
};
