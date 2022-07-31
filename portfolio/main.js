import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//defining some variables for all planets
var sun_mod, merc_mod, ven_mod, earth_mod, mars_mod, jup_mod, sat_mod, ura_mod, nept_mod;

//we will always need 3 things : 1. Scene 2. Camera 3.Renderer
//scene == container 
const scene = new THREE.Scene();

//using perspective camera.
//arg1 is a FOV 
//arg2 is aspect ratio
//arg3 and 4 is the view frustum  
const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  precision: 'mediump'
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor( 0xC5C5C3 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//setting camera to the middle of the scene 
camera.position.set(32.117296424765335, 0.23034898254731445, -0.7981909379029964);
renderer.render(scene, camera);

// //choosing a shape to give the object
// const geometry = new THREE.TorusGeometry(5, 1, 16, 100);
// //choosing a material to give the shape
// const material = new THREE.MeshStandardMaterial({
//   color: 0xFF6347//,
//   //wireframe: true
// })
// //creating a mesh for the object shape
// const torus = new THREE.Mesh(geometry, material);

// //adding it to the scene
// scene.add(torus);

//adding a point light source to the scene 
const pointlight = new THREE.PointLight(0xFFFFFF);
pointlight.position.set(0, 15, 15);

//adding an ambient light source to the scene 
const ambientlight = new THREE.AmbientLight(0xFFFFFF);
ambientlight.position.set(20, 0, 10);
scene.add(pointlight, ambientlight);

//adding a temporary light helper to understand the scene 
const lighthelper = new THREE.PointLightHelper(pointlight);
const gridhelper = new THREE.GridHelper(200, 50);
scene.add(lighthelper);

//instantiating the orbit controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", event => {
  console.log(controls.object.position);
});
//setting min and max zoom distance 
controls.minDistance = 3;
controls.maxDistance = 250;


//simulating orbit paths for all planets
function addOrbitPath(r)
{
  const geometry = new THREE.TorusGeometry(r, 0.004, 100, 100);
  const material = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    transparent: true
  });
  const orbit = new THREE.Mesh(geometry, material);
  orbit.rotation.x += Math.PI /2;
  scene.add(orbit);
}



//instantiating the loader class for GLTF files
//loading all the planets in solar system

//loading the sun
const loader = new GLTFLoader();
loader.load('media/sun/scene.gltf', function (gltf) {
  sun_mod = gltf.scene;
  gltf.scene.scale.set(0.02, 0.02, 0.02);			   
	gltf.scene.position.x = 0;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(sun_mod);
});

//loading mercury
const loader1 = new GLTFLoader();
loader1.load('media/mercury/scene.gltf', function (gltf) {
  merc_mod = gltf.scene;
  gltf.scene.scale.set( 0.1, 0.1, 0.1);			   
	gltf.scene.position.x = 35;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(merc_mod);
  addOrbitPath(35);
});

//loading venus
const loader2 = new GLTFLoader();
loader2.load('media/venus/scene.gltf', function (gltf) {
  ven_mod = gltf.scene;
  gltf.scene.scale.set( 0.001, 0.001, 0.001);			   
	gltf.scene.position.x = 45;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(ven_mod);
  addOrbitPath(45);
});

//loading earth and moon 
const loader3 = new GLTFLoader();
loader3.load('media/earth/scene.gltf', function (gltf) {
  earth_mod = gltf.scene;
  gltf.scene.scale.set( 1, 1, 1);			   
	gltf.scene.position.x = 65;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(earth_mod);
  addOrbitPath(65);
});

//loading mars
const loader4 = new GLTFLoader();
loader4.load('media/mars/scene.gltf', function (gltf) {
  mars_mod = gltf.scene;
  gltf.scene.scale.set( 1, 1, 1);			   
	gltf.scene.position.x = 85;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(mars_mod);
  addOrbitPath(85);
});

//loading jupiter
const loader5 = new GLTFLoader();
loader5.load('media/jupiter/scene.gltf', function (gltf) {
  jup_mod = gltf.scene;
  gltf.scene.scale.set( 1.2, 1.2, 1.2);			   
	gltf.scene.position.x = 105;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(jup_mod);
  addOrbitPath(105);
});

//loading saturn
const loader6 = new GLTFLoader();
loader6.load('media/saturn/scene.gltf', function (gltf) {
  sat_mod = gltf.scene;
  gltf.scene.scale.set( 1.7, 1.7, 1.7);			   
	gltf.scene.position.x = 125;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(sat_mod);
  addOrbitPath(125);
});

//loading uranus
const loader7 = new GLTFLoader();
loader7.load('media/uranus/scene.gltf', function (gltf) {
  ura_mod = gltf.scene;
  gltf.scene.scale.set( 0.00002, 0.00002, 0.00002);			   
	gltf.scene.position.x = 145;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(ura_mod);
  addOrbitPath(145);
});

//loading neptune
const loader8 = new GLTFLoader();
loader8.load('media/neptune/scene.gltf', function (gltf) {
  nept_mod = gltf.scene;
  gltf.scene.scale.set( 0.006, 0.006, 0.006);			   
	gltf.scene.position.x = 165;				    //Position (x = right+ left-) 
  gltf.scene.position.y = 0;				    //Position (y = up+, down-)
	gltf.scene.position.z = 0;
  scene.add(nept_mod);
  addOrbitPath(165);
});


//creating a matrix for planet rotations around the sun 
var matrix = new THREE.Matrix4();

//setting up a recursive function to animate the screen 
//we will be adding all the animations and mathematics in this function
//animate function for recursive rendering
function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.04;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.001;

  //rotating all planets around their own axis 
  if(sun_mod) sun_mod.rotation.y += 0.0001;
  if(merc_mod) merc_mod.rotation.y += 0.1;
  if(ven_mod) ven_mod.rotation.y += 0.09;
  if(earth_mod) earth_mod.rotation.y += 0.05;
  if(mars_mod) mars_mod.rotation.y += 0.03;
  if(jup_mod) jup_mod.rotation.y += 0.03;
  if(sat_mod) sat_mod.rotation.y += 0.02;
  if(ura_mod) ura_mod.rotation.y += 0.01;
  if(nept_mod) nept_mod.rotation.y += 0.008;

  //rotating matrix 
  matrix.makeRotationY(Math.PI / 2000);

  //revolving all the planets about axis [0,0,0]
  // merc_mod.position.applyMatrix4(matrix);
  // ven_mod.position.applyMatrix4(matrix);
  // earth_mod.position.applyMatrix4(matrix);
  // mars_mod.position.applyMatrix4(matrix);
  // jup_mod.position.applyMatrix4(matrix);
  // sat_mod.position.applyMatrix4(matrix);
  // ura_mod.position.applyMatrix4(matrix);
  // nept_mod.position.applyMatrix4(matrix);

  //updating the controls 
  controls.update();
  //rendering all elements onto the scene
  renderer.render(scene, camera);
}

//function to add stars to the scene 
function addStar() {
  const geometry = new THREE.SphereGeometry(0.35, 24, 24);
  const material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
  });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));
  star.position.set(x, y, z);
  scene.add(star);
}

//array of stars
//Array(200).fill().forEach(addStar);


//creating the skybox
const materialArray = [];
const texture_ft = new THREE.TextureLoader().load('media/skybox_front.png');
const texture_bk = new THREE.TextureLoader().load('media/skybox_back.png');
const texture_up = new THREE.TextureLoader().load('media/skybox_up.png');
const texture_dn = new THREE.TextureLoader().load('media/skybox_down.png');
const texture_lt = new THREE.TextureLoader().load('media/skybox_left.png');
const texture_rt = new THREE.TextureLoader().load('media/skybox_right.png');

//setting into material mesh
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lt }));

//setting the texture on the inside of the cube mesh for each side
for (let i = 0; i < 6; i++) {
  materialArray[i].side = THREE.BackSide;
}

//adding the skybox to the scene
const skyboxGeo = new THREE.BoxGeometry(700, 700, 700);
const skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);

//calling the animate function to display the scene
animate();  
