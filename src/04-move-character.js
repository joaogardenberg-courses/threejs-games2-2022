import * as THREE from 'three'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffa500)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const camera = new THREE.PerspectiveCamera(
  75,
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

let pressedKeys = []

const moveCharacter = () => {
  if (pressedKeys.includes('ArrowLeft')) {
    characterMesh.position.x -= 0.1
  }

  if (pressedKeys.includes('ArrowRight')) {
    characterMesh.position.x += 0.1
  }

  if (pressedKeys.includes('ArrowUp')) {
    characterMesh.position.z -= 0.1
  }

  if (pressedKeys.includes('ArrowDown')) {
    characterMesh.position.z += 0.1
  }

  if (pressedKeys.includes('Space')) {
    characterMesh.position.y += 0.1
  }

  if (pressedKeys.includes('ControlLeft')) {
    characterMesh.position.y -= 0.1
  }
}

window.addEventListener('keydown', (e) => pressedKeys.push(e.code))
window.addEventListener(
  'keyup',
  (e) => (pressedKeys = pressedKeys.filter((code) => code !== e.code))
)

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  pressedKeys.length && moveCharacter()
}

animate()
