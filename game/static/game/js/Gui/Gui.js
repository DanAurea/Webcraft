function GUI(domId, openCallback, updateCallback, closeCallback)
{
    GUIS.guiList.push(this);

    this.domId = domId;
    this.openCallback = openCallback;
    this.updateCallback = updateCallback;
    this.closeCallback = closeCallback;
    this.opened = false;

    this.open =
    function open()
    {
        var gui = $(this.domId);
        gui.fadeIn();

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
        gui.fadeOut();

        if(this.closeCallback != null)
        {
            this.closeCallback(gui);
        }
        this.opened = false;
    }
}

function GUIS()
{
    this.guiList = [];
    this.init =
    function init()
    {
        //Register All GUI
        this.INGAME_GUI = new GUI("#ingameGui", ingameGui.onIngameGuiOpen, ingameGui.onIngameGuiUpdate, null);
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
}
var GUIS = new GUIS();
