function Container(x, y, width, height)
{
    this.slots = [];
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.onClick =
    function onClick()
    {
        if(this.isInContainer())
        {
            for(var i = 0, length = this.slots.length; i < length; i++)
            {
                if(this.slots[i].isHovered())
                {
                    this.slots[i].onClick();
                }
            }

            return true;
        }
        else
        {
            return false;
        }
    }

    this.render =
    function render()
    {
        for(var i = 0, length = this.slots.length; i < length; i++)
        {
            this.slots[i].render();
        }
    }

    this.isInContainer =
    function isInContainer()
    {
        return MathUtil.pointInRectangle(MouseUtil.mouseX, MouseUtil.mouseY, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    }
}
