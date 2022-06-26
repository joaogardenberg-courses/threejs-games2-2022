import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffa500)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
)
camera.position.set(0, 0, 5)

const characterGeometry = new THREE.SphereBufferGeometry(2, 32, 32)
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const characterMesh = new THREE.Mesh(characterGeometry, characterMaterial)
scene.add(characterMesh)

console.log(camera.position, characterMesh.position)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()
