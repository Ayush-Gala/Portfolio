import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

//defining some variables
var earth_mod;

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
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//setting camera to the middle of the scene 
camera.position.setZ(30);
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
//controls.addEventListener('change',renderer);
controls.minDistance = 0;
controls.maxDistance = 250;

//setting up a recursive function to animate the screen 
//instantiating the loader class for GLTF files
const loader = new GLTFLoader();
loader.load('media/earth/scene.gltf', function (gltf) {
  earth_mod = gltf.scene;
  scene.add(earth_mod);
});


//animate function for recursive rendering
function animate() {
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.04;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.001;

  //rotating earth and moon 
    if(earth_mod) earth_mod.rotation.y += 0.01;
  //updating the controls 
  controls.update();

  renderer.render(scene, camera);
}

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

Array(200).fill().forEach(addStar);


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
const skyboxGeo = new THREE.BoxGeometry(500, 500, 500);
const skybox = new THREE.Mesh(skyboxGeo, materialArray);
scene.add(skybox);



//calling the animate function to display the scene
animate();  
