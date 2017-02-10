function initDebugger()
{
    console.log("Debugger Launched !");
    var gui = new dat.GUI();

    var cameraFolder = gui.addFolder("Camera");
    cameraFolder.add(camera.position, "x").listen();
    cameraFolder.add(camera.position, "y").listen();
    cameraFolder.add(camera.position, "z").listen();
    cameraFolder.open();

    var sunLightFolder = gui.addFolder("Sun light");
    var shadowFolder = sunLightFolder.addFolder("Shadow");
    sunLightFolder.add(SkyRenderer.sunLight.position, "x", 0, 360);
    sunLightFolder.add(SkyRenderer.sunLight.position, "y", 0, 360);
    sunLightFolder.add(SkyRenderer.sunLight.position, "z", 0, 360);
    shadowFolder.add(SkyRenderer.sunLight.shadow.camera, "far", 0, 300000);
    shadowFolder.add(SkyRenderer, "d", 0, 500);
    shadowFolder.add(renderer.shadowMap, "renderReverseSided");

    var skyFolder = gui.addFolder("Sky");
    var fogFolder = skyFolder.addFolder("Fog");
    fogFolder.add(scene.fog, "density", 0, 0.1);
}
