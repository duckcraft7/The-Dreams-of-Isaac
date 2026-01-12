window.addEventListener('DOMContentLoaded', () => {
  const room = document.getElementById('room')
  const godRig = document.getElementById('godRig')

  let roomIndex = 0
  const rooms = ['dream_1', 'dream_2', 'dream_3']

  function clearRoom() {
    while (room.firstChild) room.removeChild(room.firstChild)
  }

  function spawnDoor() {
    const door = document.createElement('a-box')
    door.setAttribute('position', '0 1 -6.8')
    door.setAttribute('width', '2')
    door.setAttribute('height', '2')
    door.setAttribute('depth', '0.2')
    door.setAttribute('color', '#777')
    door.setAttribute('door', '')
    room.appendChild(door)
  }

  function loadRoom(i) {
    clearRoom()
    if (!rooms[i]) return

    spawnDoor()
    godRig.object3D.position.set(0, 1.6, 5)
  }

  AFRAME.registerComponent('door', {
    tick: function () {
      const d = this.el.object3D.position
      const g = godRig.object3D.position
      if (d.distanceTo(g) < 1.5) {
        roomIndex++
        loadRoom(roomIndex)
      }
    }
  })

  loadRoom(roomIndex)
})
