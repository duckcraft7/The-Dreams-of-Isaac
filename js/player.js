AFRAME.registerComponent('player', {
  schema: {
    speed: { default: 2 }
  },

  tick: function (time, delta) {
    const pos = this.el.object3D.position
    const cam = document.querySelector('a-camera').object3D

    // direção baseada no olhar
    const dir = new THREE.Vector3()
    cam.getWorldDirection(dir)
    dir.y = 0
    dir.normalize()

    // movimento automático (VR confortável)
    pos.addScaledVector(dir, delta * 0.001 * this.data.speed)
  }
})
