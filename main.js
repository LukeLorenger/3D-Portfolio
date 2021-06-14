import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';


// scene

const scene = new THREE.Scene();

// camera

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

// Geometry - Add an object

const geometry = new THREE.TorusGeometry(10, 3, 16, 100 )
const donutTexture = new THREE.TextureLoader().load('normal.jpg');
// new THREE.MeshBasicMaterial( { map: lukeTexture } )
// const material = new THREE.MeshStandardMaterial( { color: 0x800000 } );
const material = new THREE.MeshBasicMaterial( { map: donutTexture } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

//controls


// Light

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

// Light Helper

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);

// Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff } )
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)


// Space texture

const spaceTexture = new THREE.TextureLoader().load('space.jpeg');
scene.background = spaceTexture;

// Avatar

const lukeTexture = new THREE.TextureLoader().load('me.jpg');
const luke = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  // new THREE.CylinderGeometry( 5, 5, 1, 32 ),
  new THREE.MeshBasicMaterial( { map: lukeTexture } )
);

scene.add(luke);

// Planet A

const planetATexture = new THREE.TextureLoader().load('planetA.jpg');
const planetA = new THREE.Mesh(
  new THREE.DodecahedronGeometry(3,3,3),
  new THREE.MeshBasicMaterial( { map: planetATexture } )
);

scene.add(planetA)

// Planet B

const planetBTexture = new THREE.TextureLoader().load('planetB.jpg');
const planetB = new THREE.Mesh(
  new THREE.DodecahedronGeometry(30,30,30),
  new THREE.MeshBasicMaterial( { map: planetBTexture } )
);

scene.add(planetB)

// Planet C

const planetCTexture = new THREE.TextureLoader().load('deathstar.png');
const planetC = new THREE.Mesh(
  new THREE.DodecahedronGeometry(10,10,10),
  new THREE.MeshBasicMaterial( { map: planetCTexture } )
);

scene.add(planetC)

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon)


// Positioning 

moon.position.z = 30;
moon.position.setX(-6);

luke.position.z = -5;
luke.position.x = 2;

planetA.position.z = 5;
planetA.position.y = 0;
planetA.position.x = 50;

planetB.position.z = -60;
planetB.position.y = 75;
planetB.position.x = -70;

planetC.position.z = -70;
planetC.position.y = 30;
planetC.position.x = 70;

// Scroll animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  luke.rotation.y += 0.01;
  luke.rotation.z += 0.01;

  planetA.rotation.y += 0.01;
  planetA.rotation.z += 0.01;

  // planetB.rotation.x += 0.05;
  // planetB.rotation.y += 0.075;
  // planetB.rotation.z += 0.05;

  // planetC.rotation.x += 0.05;
  // planetC.rotation.y += 0.075;
  // planetC.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.001;
}

document.body.onscroll = moveCamera
moveCamera();

// Loop

function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  luke.rotation.x += 0.01;
  luke.rotation.y += 0.005;
  luke.rotation.z += 0.01;

  planetA.rotation.x += 0.01;
  planetA.rotation.y += 0.005;
  planetA.rotation.z += 0.01;

  // planetB.rotation.x += 0.001;
  planetB.rotation.y += 0.001;
  // planetB.rotation.z += 0.001;

  // planetB.rotation.x += 0.001;
  planetC.rotation.y -= 0.003;
  // planetB.rotation.z += 0.001;

  moon.rotation.x += 0.001;
  moon.rotation.y += 0.003;

  // controls.update();

  renderer.render( scene, camera );
}

animate();