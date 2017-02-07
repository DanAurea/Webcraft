function initDebugger()
{
    console.log("Debugger Launched !");
    var gui = new dat.GUI();
    gui.add(camera.position, "x", 0, 200);
    gui.add(camera.position, "y", 0, 260);
    gui.add(camera.position, "z", 0, 200);
}
