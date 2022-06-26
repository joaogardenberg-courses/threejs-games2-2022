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
camera.position.z = 5

const characterGeometry = new THREE.SphereBufferGeometry(2, 32, 32)
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const characterMesh = new THREE.Mesh(characterGeometry, characterMaterial)
scene.add(characterMesh)

const floorGeometry = new THREE.PlaneBufferGeometry(1000, 1000, 10, 10)
const floorMaterial = new THREE.MeshBasicMaterial({
  color: 0x228b22,
  side: THREE.DoubleSide
})
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial)
floorMesh.position.y = -5
floorMesh.rotation.x = Math.PI / 2
scene.add(floorMesh)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()
