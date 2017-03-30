function GameRenderer()
{
    var depthMaterial, effectComposer, depthRenderTarget;
    var group;
    var depthScale = 1.0;

    this.ssaoPass;
    this.renderDistance = 150;

    this.init =
    function init()
    {
        //Init renderer
        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.gammaInput = true;
    	renderer.gammaOutput = true;
        $("#gameContainer").append(renderer.domElement);

        //Init scene
        scene = new THREE.Scene();
        FPSCamera.initFPSCamera();
        SkyRenderer.init();

        //Create camera (FOV, ratio, near, far)
        camera = new THREE.PerspectiveCamera(FOV, width / height, 0.01, this.renderDistance);
        camera.rotation.order = "YXZ";
        camera.position.set(20, 30, 20);

        scene.add(camera);

        this.initPostprocessing();
    }

    this.initPostprocessing =
    function initPostprocessing()
    {
        //Orginal code from https://github.com/mrdoob/three.js/blob/master/examples/webgl_postprocessing_ssao.html

    	// Setup render pass
    	var renderPass = new THREE.RenderPass(scene, camera);
    	// Setup depth pass
    	depthMaterial = new THREE.MeshDepthMaterial();
    	depthMaterial.depthPacking = THREE.RGBADepthPacking;
    	depthMaterial.blending = THREE.NoBlending;
    	var pars = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter};
    	depthRenderTarget = new THREE.WebGLRenderTarget(width, height, pars);
    	// Setup SSAO pass
    	this.ssaoPass = new THREE.ShaderPass(THREE.SSAOShader);
    	this.ssaoPass.renderToScreen = true;
    	this.ssaoPass.uniforms["tDepth"].value = depthRenderTarget.texture;
    	this.ssaoPass.uniforms["size"].value.set(width, height);
    	this.ssaoPass.uniforms["cameraNear"].value = 0.1;
    	this.ssaoPass.uniforms["cameraFar"].value = 700;
    	this.ssaoPass.uniforms["onlyAO"].value = false;
    	this.ssaoPass.uniforms["aoClamp"].value = 0.3;
    	this.ssaoPass.uniforms["lumInfluence"].value = 0.8;

    	// Add pass to effect composer
    	effectComposer = new THREE.EffectComposer(renderer);
    	effectComposer.addPass(renderPass);
    	effectComposer.addPass(this.ssaoPass);

        console.log("SSAO done !");
    }

    this.update =
    function update()
    {
        FPSCamera.updateCamera();
        SkyRenderer.update();
        MapManager.updateRender();

        scene.overrideMaterial = depthMaterial;
		renderer.render(scene, camera, depthRenderTarget, true);
		scene.overrideMaterial = null;
		effectComposer.render();
    }

    this.onResize =
    function onResize()
    {
        this.ssaoPass.uniforms[ 'size' ].value.set(width, height);
		var pixelRatio = renderer.getPixelRatio();
		var newWidth  = Math.floor(width / pixelRatio) || 1;
		var newHeight = Math.floor(height / pixelRatio) || 1;
		depthRenderTarget.setSize(newWidth, newHeight);
		effectComposer.setSize(newWidth, newHeight);
    }
}

var GameRenderer = new GameRenderer();
