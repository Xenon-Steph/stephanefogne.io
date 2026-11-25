import * as THREE from 'three';
// importation du module GLTFLoader depuis le répertoire des addons de Three.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// loader pour charger le modèle 3D
const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;
// Light pour les objets 3D
const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

function animate( time ) {

  cube.rotation.x = time / 2000;
  cube.rotation.y = time / 1000;

  renderer.render( scene, camera );

}
loader.load('./Boombox.glb', function (glb) {
    glb.scene.scale.set(70, 50, 60); // Scale up if it's too small
    glb.scene.position.x = 1.6;        // deplacer le modèle sur l'axe X
    glb.scene.position.y = 0;          // deplacer le modèle sur l'axe Y
    glb.scene.position.z = 0;          // deplacer le modèle sur l'axe Z
    scene.add(glb.scene);
}, undefined, function (error) {
    console.error(error);
});
// animation loop
renderer.setAnimationLoop( animate );

