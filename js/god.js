AFRAME.registerComponent('god', {
  schema: {
    speed: { default: 3 },
    turnSpeed: { default: 60 }
  },

  init: function () {
    this.move = { f: false, b: false, l: false, r: false }

    window.addEventListener('keydown', e => {
      if (e.key === 'w') this.move.f = true
      if (e.key === 's') this.move.b = true
      if (e.key === 'a') this.move.l = true
      if (e.key === 'd') this.move.r = true
    })

    window.addEventListener('keyup', e => {
      if (e.key === 'w') this.move.f = false
      if (e.key === 's') this.move.b = false
      if (e.key === 'a') this.move.l = false
      if (e.key === 'd') this.move.r = false
    })
  },

  tick: function (time, delta) {
    const rig = this.el.object3D
    const dt = delta / 1000

    // rotação esquerda / direita
    if (this.move.l) rig.rotation.y += THREE.MathUtils.degToRad(this.data.turnSpeed * dt)
    if (this.move.r) rig.rotation.y -= THREE.MathUtils.degToRad(this.data.turnSpeed * dt)

    // direção baseada NO RIG (não na câmera)
    const dir = new THREE.Vector3(
      Math.sin(rig.rotation.y),
      0,
      Math.cos(rig.rotation.y)
    )

    if (this.move.f) rig.position.addScaledVector(dir, -this.data.speed * dt)
    if (this.move.b) rig.position.addScaledVector(dir,  this.data.speed * dt)
  }
})
