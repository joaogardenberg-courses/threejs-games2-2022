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

console.log('running')

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()
