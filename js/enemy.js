AFRAME.registerComponent('enemy', {
  tick: function (time, delta) {
    const godPos = document.querySelector('#godRig').object3D.position
    const pos = this.el.object3D.position

    const dir = new THREE.Vector3()
    dir.subVectors(godPos, pos)
    dir.y = 0
    dir.normalize()

    pos.addScaledVector(dir, delta * 0.0006)
  }
})
