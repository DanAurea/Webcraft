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
    this.model = null;
    this.avatar = "cat";
    this.username = "Anonymous";
    this.inventory = new Array(10);
    this.handIndex = 0;

    this._beginUpdate = EntityPlayer.prototype.beginUpdate;
    this.beginUpdate =
    function beginUpdate()
    {
        //Manage gravity and jump
        if(!this.fly && this.motionY > -200 && this == thePlayer)
        {
            this.motionY -= gravity;
        }

        if(this.y < -100)
        {
            this.setPosition(2, 260, 2);
        }

        if(this.isJumping)
        {
            this.isJumping = false;
            this.motionY += 1.2;
        }

        this._beginUpdate();

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
        var stepHeightX = 0;
        var stepHeightZ = 0;

        if(!this.noClip)
        {
            var extandedBox = this.collision.expandBox(this.totalMotionX, this.totalMotionY, this.totalMotionZ);
            var tiles = extandedBox.tilesInBox(true);
            extandedBox.addMapBoundaries(tiles);

            var tileAmount = tiles.length;
            if(tileAmount > 0)
            {
                var nPos = null;
                for(var i = 0; i < tileAmount; i++)
                {
                    nPos = tiles[i].clipX(this.collision, newX, this.onGround);
                    newX = nPos[0];

                    if(nPos[1] > stepHeightX)
                    {
                        stepHeightX = nPos[1];
                    }
                }
                this.collision.move(newX, stepHeightX, 0);
                stepHeightZ = stepHeightX;

                for(var i = 0; i < tileAmount; i++)
                {
                    nPos = tiles[i].clipZ(this.collision, newZ, this.onGround);
                    newZ = nPos[0];

                    if(nPos[1] > stepHeightZ)
                    {
                        stepHeightZ = nPos[1];
                    }
                }
                this.collision.move(0, stepHeightZ > stepHeightX ? stepHeightZ - stepHeightX : 0, newZ);

                for(var i = 0; i < tileAmount; i++)
                {
                    newY = tiles[i].clipY(this.collision, newY);
                }
                this.collision.move(0, newY, 0);
                newY += stepHeightZ;
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

    this.render =
    function render()
    {
        renderX = TimeManager.interpolate(this.prevX, this.x);
        renderY = TimeManager.interpolate(this.prevY, this.y);
        renderZ = TimeManager.interpolate(this.prevZ, this.z);
        renderPitch = TimeManager.interpolate(this.lastPitch, this.pitch);
        renderYaw = TimeManager.interpolate(this.lastYaw, this.yaw);

        if(this.model  != null)
        {
            this.model.position.x = renderX;
            this.model.position.y = renderY;
            this.model.position.z = renderZ;

            this.model.rotation.y = MathUtil.toRadians(renderYaw);
        }
    }

    this.onLogin =
    function onLogin(username, avatar)
    {
        this.username = username;
        this.avatar = avatar;
        this.model = ModelLoader.models[gameFolder + "models/" + this.avatar + ".obj"].clone();
        scene.add(this.model);
    }
}

//Inheritance
EntityPlayer.prototype = new Entity();
