AFRAME.registerComponent('god', {
  schema: {
    speed: { default: 3 }
  },

  tick: function (time, delta) {
    const rig = this.el.object3D
    const cam = document.querySelector('#camera').object3D

    const dir = new THREE.Vector3()
    cam.getWorldDirection(dir)
    dir.y = 0
    dir.normalize()

    rig.position.addScaledVector(
      dir,
      delta * 0.001 * this.data.speed
    )
  }
})
