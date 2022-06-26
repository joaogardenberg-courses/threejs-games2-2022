import * as THREE from 'three'
import chunk from 'lodash/chunk'

const healthLabel = document.getElementById('health-label')
healthLabel.classList.add('show')

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
characterMesh.health = 100
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

let collidableObjects = []

const obstacleGeometry = new THREE.BoxBufferGeometry(5, 5, 5)
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0x9e1a1a })
const obstacleMesh = new THREE.Mesh(obstacleGeometry, obstacleMaterial)
obstacleMesh.position.set(0, 0, -10)
scene.add(obstacleMesh)
collidableObjects.push(obstacleMesh)

let pressedKeys = []

const moveCharacter = () => {
  const moveDistance = 0.1
  const originPoint = characterMesh.position.clone()

  const collided = chunk(
    characterMesh.geometry.attributes.position.array,
    3
  ).some((vertex) => {
    const localVertex = new THREE.Vector3(...vertex)
    const globalVertex = localVertex.applyMatrix4(characterMesh.matrix)
    const directionVector = globalVertex.sub(characterMesh.position)

    const raycast = new THREE.Raycaster(
      originPoint,
      directionVector.clone().normalize()
    )

    const collisions = raycast.intersectObjects(collidableObjects)

    if (
      collisions.length &&
      collisions[0].distance < directionVector.length()
    ) {
      return true
    }

    return false
  })

  if (collided) {
    characterMesh.health--
    healthLabel.innerHTML = `Health: ${characterMesh.health}`
  }

  if (pressedKeys.includes('KeyA')) {
    characterMesh.rotation.y += moveDistance / 5
  }

  if (pressedKeys.includes('KeyD')) {
    characterMesh.rotation.y -= moveDistance / 5
  }

  if (pressedKeys.includes('KeyW')) {
    characterMesh.translateZ(-moveDistance)
  }

  if (pressedKeys.includes('KeyS')) {
    characterMesh.translateZ(moveDistance)
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
