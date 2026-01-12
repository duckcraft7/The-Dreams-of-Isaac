AFRAME.registerComponent('god', {
  schema: {
    speed: { default: 4 },
    mouseSensitivity: { default: 0.002 }
  },

  init: function () {
    this.move = { f:false, b:false, l:false, r:false }
    this.yaw = 0

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

    window.addEventListener('mousemove', e => {
      if (document.pointerLockElement !== document.body) return
      this.yaw -= e.movementX * this.data.mouseSensitivity
    })
  },

  tick: function (time, delta) {
    const rig = this.el.object3D
    const dt = delta / 1000

    // rotação horizontal (mouse)
    rig.rotation.y = this.yaw

    // direção frontal baseada no rig
    const dir = new THREE.Vector3(
      Math.sin(rig.rotation.y),
      0,
      Math.cos(rig.rotation.y)
    )

    if (this.move.f) rig.position.addScaledVector(dir, -this.data.speed * dt)
    if (this.move.b) rig.position.addScaledVector(dir,  this.data.speed * dt)
    if (this.move.l) rig.position.addScaledVector(
      new THREE.Vector3(dir.z, 0, -dir.x),
      -this.data.speed * dt
    )
    if (this.move.r) rig.position.addScaledVector(
      new THREE.Vector3(dir.z, 0, -dir.x),
       this.data.speed * dt
    )
  }
})
