AFRAME.registerComponent('shoot', {
  init: function () {
    window.addEventListener('click', () => this.fire())
  },

  fire: function () {
    const bullet = document.createElement('a-sphere')
    bullet.setAttribute('radius', 0.1)
    bullet.setAttribute('color', 'yellow')

    const pos = this.el.object3D.position
    bullet.setAttribute('position', {
      x: pos.x,
      y: pos.y,
      z: pos.z
    })

    bullet.setAttribute('bullet', '')
    this.el.sceneEl.appendChild(bullet)
  }
})

AFRAME.registerComponent('bullet', {
  tick: function (time, delta) {
    const cam = document.querySelector('a-camera').object3D
    const dir = new THREE.Vector3()
    cam.getWorldDirection(dir)

    this.el.object3D.position.addScaledVector(
      dir,
      delta * 0.01
    )
  }
})
