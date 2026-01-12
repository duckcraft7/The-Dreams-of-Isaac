window.addEventListener('DOMContentLoaded', () => {
  const roomEl = document.getElementById('room')
  const scene = document.getElementById('scene')
  const godRig = document.getElementById('godRig')

  let currentRoom = 0

  const rooms = [
    {
      enemies: [
        { x: 2, z: -2 },
        { x: -2, z: 1 }
      ]
    },
    {
      enemies: [
        { x: 3, z: -3 },
        { x: -3, z: -2 },
        { x: 0, z: 2 }
      ]
    },
    {
      enemies: [
        { x: 0, z: -3 },
        { x: 3, z: 0 },
        { x: -3, z: 0 }
      ]
    }
    // sala final (Isaac) vem depois
  ]

  function clearRoom() {
    while (roomEl.firstChild) {
      roomEl.removeChild(roomEl.firstChild)
    }
  }

  function spawnEnemies(roomData) {
    roomData.enemies.forEach(e => {
      const enemy = document.createElement('a-sphere')
      enemy.setAttribute('position', `${e.x} 0.5 ${e.z}`)
      enemy.setAttribute('radius', '0.4')
      enemy.setAttribute('color', 'darkred')
      enemy.setAttribute('enemy', '')
      roomEl.appendChild(enemy)
    })
  }

  function spawnDoor() {
    const door = document.createElement('a-box')
    door.setAttribute('id', 'door')
    door.setAttribute('position', '0 1 -6.8')
    door.setAttribute('width', '2')
    door.setAttribute('height', '2')
    door.setAttribute('depth', '0.2')
    door.setAttribute('color', '#666')
    door.setAttribute('door', '')
    roomEl.appendChild(door)
  }

  function loadRoom(index) {
    clearRoom()

    if (!rooms[index]) {
      console.log('Fim do sonho (Isaac depois)')
      return
    }

    spawnEnemies(rooms[index])

    // reposiciona Deus
    godRig.object3D.position.set(0, 4, 6)
  }

  // checa se a sala está limpa
  scene.addEventListener('enemy-killed', () => {
    const enemiesLeft = roomEl.querySelectorAll('[enemy]').length
    if (enemiesLeft === 0) {
      spawnDoor()
    }
  })

  // porta → próxima sala
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
