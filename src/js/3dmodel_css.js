// 3D Map メイン
$(
function(){
  var make_camera = function(width, height){
    var fov    = 60;             // 画角
    var aspect = width / height;
    var near   = 1;              // これより近くは非表示
    var far    = 20000;          // これより遠くは非表示
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(-50, 20, 0);
    return camera;
  };

  var make_renderer = function(width, height){
    var renderer = new THREE.CSS3DRenderer();
    renderer.setSize(width, height);
    $("#modelfield").append(renderer.domElement);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = 0;
    return renderer;
  };

  var make_light = function(){
    var light = new THREE.DirectionalLight(0xffffff, 0.7);
    light.position.set(0, 0.5, 0.5);
    return light;
  };

  var make_ambientlight = function(){
    return new THREE.AmbientLight(0x909090);
  };

  var make_hemilight = function(){
    var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    light.color.setHSL(0.6, 1, 0.6);
    light.groundColor.setHSL(0.095, 1, 0.75);
    light.position.set(0, 500, 0);
    return light;
  };

  var make_sphere_mesh = function(scene, r, color, trans){
    var geometry = new THREE.SphereGeometry(r, 32, 16);
    var material = new THREE.MeshPhongMaterial(
      {
        color: color,
        ambient: 0xffffff,
        //specular: 0xcccccc,
        shininess: 50,
        metal: false
      });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    trans(mesh);
    scene.add(mesh);
  };

  var make_controls = function(camera){
    var controls = new THREE.TrackballControls(camera);
    return controls;
  };

  var main = function(){
    var width  = 1024;
    var height = 768;
    var scene = new THREE.Scene();
    scene.add(make_light());
    scene.add(make_ambientlight());
    scene.add(make_hemilight());
    make_sphere_mesh(scene, 8, 0xc0c0c0, function(mesh){
                       mesh.position.y = -5;
                       mesh.position.z = 8;
                     });
    make_sphere_mesh(scene, 8, 0xc0c0c0, function(mesh){
                       mesh.position.y = -5;
                       mesh.position.z = -8;
                     });
    make_sphere_mesh(scene, 12, 0x0000ff, function(mesh){});

    var camera = make_camera(width, height);
    var controls = make_controls(camera);
    var renderer = make_renderer(width, height);

    (function renderLoop() {
      requestAnimationFrame(renderLoop);
      renderer.render(scene, camera);
      controls.update();
    })();
  };

  main();
});
