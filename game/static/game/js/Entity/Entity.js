function Entity()
{
    this.id = -1;
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.prevZ = 0;
    this.totalMotionX = 0;
    this.totalMotionY = 0;
    this.totalMotionZ = 0;
    this.motionX = 0;
    this.motionY = 0;
    this.motionZ = 0;
    this.rotation = 0;
    this.collision = null;
    this.pitch = 0;
    this.lastPitch = 0;
    this.yaw = 0;
    this.lastYaw = 0;

    this.spawn =
    function spawn()
    {
        this.id = Entities.entityList.length;
        this.collision = new AABB(0, 0, 0, 0.75, 1.80, 0.75);
        Entities.entityList.push(this);
    }

    this.despawn =
    function despawn()
    {
        Entities.entityList.splice(this.id, 1);
    }

    this.setPosition =
    function setPosition(x, y, z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        if(this.collision != null)
        {
            this.collision.updatePosCenter(x, y, z);
        }
    }

    this.setMotion =
    function setMotion(x, y, z)
    {
        this.totalMotionX = x;
        this.totalMotionY = y;
        this.totalMotionZ = z;
    }

    this.setCamera =
    function setCamera(pitch, yaw)
    {
        this.pitch = pitch;
        this.yaw = yaw;
    }

    this.beginUpdate =
    function beginUpdate()
    {
        this.prevX = this.x;
        this.prevY = this.y;
        this.prevZ = this.z;
        this.lastPitch = this.pitch;
        this.lastYaw = this.yaw;

        this.totalMotionX = this.motionX;
        this.totalMotionY = this.motionY;
        this.totalMotionZ = this.motionZ;
    }

    this.update =
    function update()
    {}

    this.endUpdate =
    function endUpdate()
    {
        this.handleCollision();

        this.collision.updatePosCenter(this.x, this.y, this.z);

        this.motionX *= 0.8;
        this.motionZ *= 0.8;
    }

    this.handleCollision =
    function handleCollision()
    {
        this.x += this.totalMotionX;
        this.y += this.totalMotionY;
        this.z += this.totalMotionZ;
    }

    this.render =
    function render(){}

    this.hasMoved =
    function hasMoved()
    {
        return this.lastYaw != this.yaw || this.lastPitch != this.pitch || this.prevX != this.x || this.prevY != this.y || this.prevZ != this.z;
    }
}

function Entities()
{
    this.entityList = [];

    this.updateEntities =
    function updateEntities()
    {
        for(var i = 0, entityAmount = this.entityList.length; i < entityAmount; i++)
        {
            this.entityList[i].beginUpdate();
            this.entityList[i].update();
            this.entityList[i].endUpdate();
        }
    }

    this.renderEntities =
    function renderEntities()
    {
        for(var i = 0, entityAmount = this.entityList.length; i < entityAmount; i++)
        {
            this.entityList[i].render();
        }
    }

    this.getPlayerByUsername =
    function getPlayerByUsername(username)
    {
        for(var i = 0, entityAmount = this.entityList.length; i < entityAmount; i++)
        {
            entity = this.entityList[i];
            if(entity instanceof EntityPlayer && entity.username == username)
            {
                return entity;
            }
        }
        return null;
    }
}

var Entities = new Entities();
