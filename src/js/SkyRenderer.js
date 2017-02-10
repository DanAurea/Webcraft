var topSkyColor = new THREE.Color(0x2299FF);
var bottomSkyColor = new THREE.Color(0xDDDDFF);
var blackSkyColor = new THREE.Color(0x000000);

function SkyRenderer()
{
    this.hemiLight = null;
    this.sunLight = null;
    this.fogColor = new THREE.Color(150, 92, 208);
    this.skyDome = null;
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

        renderer.shadowMap.enabled = true;
		renderer.shadowMap.renderReverseSided = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        scene.fog = new THREE.FogExp2(this.fogColor.toInt(), 0.000055);

        scene.add(new THREE.AmbientLight(0x222222));

        this.sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
		this.sunLight.color.setHSL(0.1, 1, 0.95);
		this.sunLight.position.set(-2, 500, 2);
		this.sunLight.position.multiplyScalar(50);

		scene.add(this.sunLight);

        //Manage shadow
        this.sunLight.castShadow = true;
		this.sunLight.shadow.mapSize.width = 2048;
		this.sunLight.shadow.mapSize.height = 2048;

        this.d = 50;
		this.sunLight.shadow.camera.left = -this.d;
		this.sunLight.shadow.camera.right = this.d;
		this.sunLight.shadow.camera.top = this.d;
		this.sunLight.shadow.camera.bottom = -this.d;
		this.sunLight.shadow.camera.far = 350000;
		this.sunLight.shadow.bias = -0.0001;


        var vertexShader = document.getElementById("vertexShader").textContent;
        var fragmentShader = document.getElementById("fragmentShader").textContent;
        this.uniforms = {topColor: {type: "c", value: topSkyColor}, bottomColor: {type: "c", value: bottomSkyColor}, offset: {type: "f", value: 0}, exponent: {type: "f", value: 0.8}};
        var skyGeo = new THREE.SphereGeometry(4000, 32, 15);
        var skyMat = new THREE.ShaderMaterial({uniforms: this.uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader, side: THREE.BackSide});

        this.skyDome = new THREE.Mesh(skyGeo, skyMat);
        scene.add(this.skyDome);
    }

    this.update =
    function update()
    {
        var time = (MapManager.time % dayDuration) / dayDuration;
        var lightAmount = Math.min((Math.cos(time * Math.PI - Math.PI) + 1), 1);
        console.log(time, lightAmount);

        this.uniforms.topColor.value = blackSkyColor.lerpRGB(topSkyColor, time);
        this.uniforms.bottomColor.value = blackSkyColor.lerpRGB(bottomSkyColor, time);
    }
}

var SkyRenderer = new SkyRenderer();
