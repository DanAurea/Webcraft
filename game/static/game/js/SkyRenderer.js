function SkyRenderer()
{
    this.hemiLight = null;
    this.sunLight = null;

    this.init =
    function init()
    {
        renderer.setClearColor(0x54A0E7);
        renderer.shadowMap.enabled = true;
		renderer.shadowMap.renderReverseSided = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        scene.fog = new THREE.Fog(0xFFFFFF, 1, 5000);
		scene.fog.color.setHSL(0.6, 0, 1);

        scene.add(new THREE.AmbientLight(0x222222));

        this.hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 0.6);
		this.hemiLight.color.setHSL(0.6, 1, 0.6);
		this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
		this.hemiLight.position.set(0, 500, 0);
		//scene.add(this.hemiLight);

        this.sunLight = new THREE.DirectionalLight(0xFFFFFF, 1);
		this.sunLight.color.setHSL(0.1, 1, 0.95);
		this.sunLight.position.set(-2, 1.75, 2);
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
    }
}

var SkyRenderer = new SkyRenderer();
