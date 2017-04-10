function Gui3D(openCallback, updateCallback, closeCallback, closedByEscape)
{
    GUIS.guiList.push(this);

    this.openCallback = openCallback;
    this.updateCallback = updateCallback;
    this.closeCallback = closeCallback;
    this.closedByEscape = closedByEscape;
    this.opened = false;

    this.open =
    function open()
    {
        this.opened = true;
        if(this.openCallback != null)
        {
            this.openCallback();
        }
    }

    this.close =
    function close()
    {
        this.opened = false;
        if(this.closeCallback != null)
        {
            this.closeCallback();
        }
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
