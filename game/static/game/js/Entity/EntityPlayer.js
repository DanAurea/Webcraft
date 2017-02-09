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
        var newX = this.totalMotionX;
        var newY = this.totalMotionY;
        var newZ = this.totalMotionZ;

        var extandedBox = this.collision.expandBox(this.totalMotionX, this.totalMotionY, this.totalMotionZ);
        var tiles = extandedBox.tilesInBox();

        var tileAmount = tiles.length;
        if(tileAmount > 0)
        {
            for(var i = 0; i < tileAmount; i++)
            {
                newY = tiles[i].clipY(this.collision, newY);
            }
            this.collision.move(0, newY, 0);

            for(var i = 0; i < tileAmount; i++)
            {
                newX = tiles[i].clipX(this.collision, newX);
            }
            this.collision.move(newX, 0, 0);

            for(var i = 0; i < tileAmount; i++)
            {
                newZ = tiles[i].clipZ(this.collision, newZ);
            }
            this.collision.move(0, 0, newZ);
        }

        this.x += newX;
        this.y += newY;
        this.z += newZ;
    }
}

//Inheritance
EntityPlayer.prototype = new Entity();
