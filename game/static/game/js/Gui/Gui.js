function GUI(domId, openCallback, updateCallback, closeCallback, closedByEscape)
{
    GUIS.guiList.push(this);

    this.domId = domId;
    this.openCallback = openCallback;
    this.updateCallback = updateCallback;
    this.closeCallback = closeCallback;
    this.closedByEscape = closedByEscape;
    this.opened = false;

    this.open =
    function open()
    {
        var gui = $(this.domId);
        gui.show();

        if(this.openCallback != null)
        {
            this.openCallback(gui);
        }
        this.opened = true;
    }

    this.close =
    function close()
    {
        var gui = $(this.domId);
        gui.hide();

        if(this.closeCallback != null)
        {
            this.closeCallback(gui);
        }
        this.opened = false;
    }

    this.toggle =
    function toggle()
    {
        if(this.opened)
        {
            this.close();
        }
        else
        {
            this.open();
        }
    }
}

function GUIS()
{
    this.guiList = [];
    this.init =
    function init()
    {
        //Register All GUI
        this.INGAME_GUI = new Gui3D(ingameGui.ingameGuiOpen, ingameGui.ingameGuiUpdate, ingameGui.ingameGuiClose, false);
        this.DEBUG_GUI = new GUI("#debugGui", null, debugGui.onDebugGuiUpdate, null, false);
        this.PLAYER_LIST = new GUI("#playerListGui", null, playerListGui.onPlayerListGuiUpdate, null, false);
        this.CHAT_GUI = new GUI("#guiChat", null, null, null, false);
        this.MAIN_MENU = new GUI("#mainMenu", null, null, null, false);
        this.INVENTORY = new Gui3D(inventoryGui.inventoryGuiOpen, inventoryGui.inventoryGuiUpdate, inventoryGui.inventoryGuiClose, true);
    }

    this.updateAllGuis =
    function updateAllGuis()
    {
        for(var i = 0, guiAmount = this.guiList.length; i < guiAmount; i++)
        {
            if(this.guiList[i].opened)
            {
                if(this.guiList[i].updateCallback != null)
                {
                    this.guiList[i].updateCallback($(this.guiList[i].domId));
                }
            }
        }
    }

    this.escapePressed =
    function escapePressed()
    {
        for(var i = 0, guiAmount = GUIS.guiList.length; i < guiAmount; i++)
        {
            if(GUIS.guiList[i].opened && GUIS.guiList[i].closedByEscape)
            {
                GUIS.guiList[i].close();
            }
        }
    }
}
var GUIS = new GUIS();
