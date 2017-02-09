var gravity = (9.81 / 40);

function EntityPlayer()
{
    this.noClip = false;
    this.fly = false;
    this.inputMotX = 0;
    this.inputMotY = 0;
    this.inputMotZ = 0;
    this.onGround = false;
    this.isJumping = false;

    this._beginUpdate = EntityPlayer.prototype.beginUpdate;
    this.beginUpdate =
    function beginUpdate()
    {
        //Manage gravity and jump
        if(!this.fly && this.motionY > -200)
        {
            this.motionY -= gravity;
        }

        if(this.isJumping)
        {
            this.isJumping = false;
            this.motionY += 1.2;
        }

        this._beginUpdate.call(this);

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

        //console.log(newY);

        if(!this.noClip)
        {
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

            this.onGround = newY != this.totalMotionY && this.totalMotionY <= 0;

            if(this.onGround && this.totalMotionY < 0)
            {
                this.motionY = 0;
            }
        }

        this.x += newX;
        this.y += newY;
        this.z += newZ;
    }

    this.jump =
    function jump()
    {
        if(this.onGround)
        {
            thePlayer.isJumping = true;
        }
    }
}

//Inheritance
EntityPlayer.prototype = new Entity();
