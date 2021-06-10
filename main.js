import './style.css'

import * as THREE from 'three';

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
const material = new THREE.MeshBasicMaterial( { color: 0xFF6347, wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

// Loop
function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  renderer.render( scene, camera );
}

animate()