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

    this.lerp =
    function lerp(x1, x2, f)
    {
        return (x2 - x1) * f + x1;
    }

    this.lessDecimal =
    function lessDecimal(value, decimal)
    {
        var power = decimal * 10;
        return Math.round(value * power) / power;
    }
}

var MathUtil = new MathUtil();
