function EntityPlayer()
{
    this.inputMotX = 0;
    this.inputMotY = 0;
    this.inputMotZ = 0;

    this.beginUpdate =
    function beginUpdate()
    {
        EntityPlayer.prototype.beginUpdate.call(this);

        this.totalMotionX += this.inputMotX;
        this.totalMotionY += this.inputMotY;
        this.totalMotionZ += this.inputMotZ;

        this.inputMotX = 0;
        this.inputMotY = 0;
        this.inputMotZ = 0;
    }

    this.handleCollision =
    function handleCollision()
    {
        this.x += this.totalMotionX;
        this.y += this.totalMotionY;
        this.z += this.totalMotionZ;
    }
}

//Inheritance
EntityPlayer.prototype = new Entity();
