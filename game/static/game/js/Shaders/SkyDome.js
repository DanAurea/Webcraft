var topSkyColor = new THREE.Color(0x2299FF);
var bottomSkyColor = new THREE.Color(0xDDDDFF);
var topBlackSkyColor = new THREE.Color(0x000000);
var bottomBlackSkyColor = new THREE.Color(0x020205);
var orangeSkyColor = new THREE.Color(0xFFB046);

var SkyDomeShader = {
    uniforms: {
        topColor: {type: "c", value: topSkyColor},
        bottomColor: {type: "c", value: bottomSkyColor},
        offset: {type: "f", value: 0},
        exponent: {type: "f", value: 0.8}
    },

    vertexShader: [
        "varying vec3 vWorldPosition;",
        "void main() {",
            "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );",
            "vWorldPosition = worldPosition.xyz;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
    ].join("\n"),

    fragmentShader: [
        "uniform vec3 topColor;",
        "uniform vec3 bottomColor;",
        "uniform float offset;",
        "uniform float exponent;",
        "varying vec3 vWorldPosition;",
        "void main() {",
            "float h = normalize( vWorldPosition + offset ).y;",
            "gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h, 0.0 ), exponent ), 0.0 ) ), 1.0 );",
        "}"
    ].join("\n"),
};
