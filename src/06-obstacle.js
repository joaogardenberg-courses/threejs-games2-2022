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
camera.position.set(0, 3, 5)

const characterGeometry = new THREE.SphereBufferGeometry(1, 32, 32)
const characterMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const characterMesh = new THREE.Mesh(characterGeometry, characterMaterial)
characterMesh.add(camera)
camera.lookAt(characterMesh.position)
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

const obstacleGeometry = new THREE.BoxBufferGeometry(5, 5, 5)
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x9e1a1a })
const obstacleMesh = new THREE.Mesh(obstacleGeometry, obstacleMaterial)
obstacleMesh.position.set(0, 0, -10)
scene.add(obstacleMesh)

let pressedKeys = []

const moveCharacter = () => {
  const moveDistance = 0.1

  if (pressedKeys.includes('KeyA')) {
    characterMesh.position.x -= moveDistance
  }

  if (pressedKeys.includes('KeyD')) {
    characterMesh.position.x += moveDistance
  }

  if (pressedKeys.includes('KeyW')) {
    characterMesh.position.z -= moveDistance
  }

  if (pressedKeys.includes('KeyS')) {
    characterMesh.position.z += moveDistance
  }

  if (pressedKeys.includes('Space')) {
    characterMesh.position.y += moveDistance
  }

  if (pressedKeys.includes('ControlLeft')) {
    characterMesh.position.y -= moveDistance
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
