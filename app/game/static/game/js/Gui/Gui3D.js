function Gui3D(openCallback, updateCallback, closeCallback, resizeCallback, closedByEscape)
{
    GUIS.guiList.push(this);

    this.openCallback = openCallback;
    this.updateCallback = updateCallback;
    this.closeCallback = closeCallback;
    this.resizeCallback = resizeCallback;
    this.closedByEscape = closedByEscape;
    this.opened = false;

    this.open =
    function open()
    {
        this.opened = true;
        if(this.openCallback != null)
        {
            this.openCallback(true);
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

function Anchors()
{
    this.CENTER_CENTER = 0;
    this.LEFT_CENTER = 1;
    this.LEFT_TOP = 2;
    this.LEFT_BOTTOM = 3;
    this.RIGHT_CENTER = 4;
    this.RIGHT_TOP = 5;
    this.RIGHT_BOTTOM = 6;
    this.CENTER_TOP = 7;
    this.CENTER_BOTTOM = 8;

    this.setPosFromAnchor =
    function setPosFromAnchor(mesh, x, y, z, w, h, externalAnchor, internalAnchor)
    {
        var pX = 0;
        var pY = 0;

        //X anchor external
        switch(externalAnchor)
        {
            case 4:
            case 5:
            case 6:
            {
                pX += width - x;
            }
        }

        //Y anchor external
        switch(externalAnchor)
        {
            case 2:
            case 5:
            case 7:
            {
                pY += height - y;
            }
        }

        //X anchor internal
        switch (internalAnchor)
        {
            case 1:
            case 2:
            case 3:
            {
                pX += w / 2;
                break;
            }
            case 4:
            case 5:
            case 6:
            {
                pX -= w / 2;
                break;
            }
        }

        //Y anchor internal
        switch (internalAnchor)
        {
            case 2:
            case 5:
            case 7:
            {
                pY -= h / 2;
                break;
            }
            case 3:
            case 6:
            case 8:
            {
                pY += h / 2;
                break;
            }
        }

        mesh.position.set(x + pX, y + pY, z);
    }
}

var Anchors = new Anchors();
