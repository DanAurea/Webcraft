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
    sunLightFolder.add(SkyRenderer.sunLight.position, "x", 0, 360);
    sunLightFolder.add(SkyRenderer.sunLight.position, "y", 0, 360);
    sunLightFolder.add(SkyRenderer.sunLight.position, "z", 0, 360);
}
