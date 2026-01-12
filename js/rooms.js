window.addEventListener('DOMContentLoaded', () => {
  const scene = document.getElementById('scene')
  const roomEl = document.getElementById('room')
  const godRig = document.getElementById('godRig')

  let currentRoom = 0

  // definição das salas (por enquanto vazias)
  const rooms = [
    { name: 'basement_1' },
    { name: 'basement_2' },
    { name: 'basement_3' }
    // sala final (Isaac) depois
  ]

  function clearRoom() {
    while (roomEl.firstChild) {
      roomEl.removeChild(roomEl.firstChild)
    }
  }

  function spawnDoor() {
    const door = document.createElement('a-box')
    door.setAttribute('id', 'door')
    door.setAttribute('position', '0 1 -6.8')
    door.setAttribute('width', '2')
    door.setAttribute('height', '2')
    door.setAttribute('depth', '0.2')
    door.setAttribute('color', '#555')
    door.setAttribute('door', '')
    roomEl.appendChild(door)
  }

  function loadRoom(index) {
    clearRoom()

    if (!rooms[index]) {
      console.log('Fim do sonho (Isaac ainda não existe)')
      return
    }

    // por enquanto TODA sala já abre a porta
    spawnDoor()

    // reposiciona Deus
    godRig.object3D.position.set(0, 4, 6)

    console.log('Sala atual:', rooms[index].name)
  }

  // componente da porta
  AFRAME.registerComponent('door', {
    tick: function () {
      const doorPos = this.el.object3D.position
      const godPos = godRig.object3D.position

      if (doorPos.distanceTo(godPos) < 1.5) {
        currentRoom++
        loadRoom(currentRoom)
      }
    }
  })

  loadRoom(currentRoom)
})
