var topSkyColor = new THREE.Color(0x2299FF);
var bottomSkyColor = new THREE.Color(0xDDDDFF);
var blackSkyColor = new THREE.Color(0x000000);
var orangeSkyColor = new THREE.Color(0xFFB046);
var starCycleDuration = 3;

function SkyRenderer()
{
    this.hemiLight = null;
    this.sunLight = null;
    this.fogColor = new THREE.Color(150, 92, 208);
    this.skyDome = null;
    this.starFields =  [];
    this.uniforms = null;

    this.init =
    function init()
    {
        THREE.Color.prototype.toInt = function()
        {
            return this.r << 16 | this.g << 8 | this.b;
        }
        THREE.Color.prototype.lerpRGB = function(color, amount)
        {
            return new THREE.Color(this.r + (color.r - this.r) * amount, this.g + (color.g - this.g) * amount, this.b + (color.b - this.b) * amount);
        }

        scene.fog = new THREE.FogExp2(this.fogColor.toInt(), 0.000055);

        //World light
        scene.add(new THREE.AmbientLight(0x020202));
        this.sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
		this.sunLight.color.setHSL(0.1, 1, 0.95);
		this.sunLight.position.set(-2, 500, 2);
		this.sunLight.position.multiplyScalar(50);
		scene.add(this.sunLight);

        //SkyDome
        var vertexShader = document.getElementById("vertexShader").textContent;
        var fragmentShader = document.getElementById("fragmentShader").textContent;
        this.uniforms = {topColor: {type: "c", value: topSkyColor}, bottomColor: {type: "c", value: bottomSkyColor}, offset: {type: "f", value: 0}, exponent: {type: "f", value: 0.8}};
        var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
        var skyMat = new THREE.ShaderMaterial({uniforms: this.uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader, side: THREE.BackSide});
        this.skyDome = new THREE.Mesh(skyGeo, skyMat);
        scene.add(this.skyDome);

        this.buildStarField();
    }

    this.update =
    function update()
    {
        var time = (MapManager.time % dayDuration) / dayDuration;
        var lightAmount = Math.max(Math.min((Math.cos(time * Math.PI * 2 - Math.PI) + 0.5), 1), 0);

        //Sky gradient
        this.skyDome.position.set(camera.position.x, camera.position.y, camera.position.z);
        this.sunLight.intensity = lightAmount;
        this.uniforms.topColor.value = blackSkyColor.lerpRGB(topSkyColor, lightAmount);

        if(lightAmount <= 0.10)
        {
            this.uniforms.bottomColor.value = blackSkyColor.lerpRGB(orangeSkyColor, lightAmount * 10);
        }
        else if(lightAmount <= 0.25)
        {
            this.uniforms.bottomColor.value = orangeSkyColor.lerpRGB(bottomSkyColor, lightAmount * 4);
        }
        else
        {
            this.uniforms.bottomColor.value = this.uniforms.bottomColor.value.lerpRGB(bottomSkyColor, lightAmount);
        }

        //Stars
        var starFieldAngle = (MapManager.time % (dayDuration * starCycleDuration)) / (dayDuration * starCycleDuration);
        for(var i = 0; i < this.starFields.length; i++)
        {
            this.starFields[i].position.set(camera.position.x, camera.position.y, camera.position.z);
            this.starFields[i].rotation.z = starFieldAngle;
            this.starFields[i].material.opacity = 1 - lightAmount;
        }
    }

    this.buildStarField =
    function buildStarField()
    {
        var radius = 3500;
        for(var size = 0; size < 3; size++)
        {
            var starsGeometry = new THREE.Geometry();
            var amount = 1000 - 400 * size;
            for (var i = 0; i <= amount; i++)
            {
            	var star = new THREE.Vector3();

                var phi = Math.random() * 2 * Math.PI;
                var theta = Math.random() * Math.PI;

                star.x = radius * Math.cos(phi) * Math.sin(theta);
                star.y = radius * Math.sin(phi) * Math.sin(theta);
                star.z = radius * Math.cos(theta);
            	starsGeometry.vertices.push(star);
            }

            var starsMaterial = new THREE.PointsMaterial({color: 0x777777, size: size, sizeAttenuation: false, transparent: true});
            this.starFields.push(new THREE.Points(starsGeometry, starsMaterial));

            scene.add(this.starFields[size]);
        }
    }

    this.lerp =
    function lerp(x1, x2, f)
    {
        return (x2 - x1) * f + x1;
    }
}

var SkyRenderer = new SkyRenderer();
