function MathUtil()
{
    this.toRadians =
    function toRadians(degrees)
    {
    	return degrees * (Math.PI / 180);
    }

    this.pointInRectangle =
    function pointInRectangle(pX, pY, x, y, width, height)
    {
        return pX >= x && pX < x + width && pY >= y && pY < y + height;
    }
}

var MathUtil = new MathUtil();
