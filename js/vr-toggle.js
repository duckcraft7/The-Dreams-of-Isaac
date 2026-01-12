window.addEventListener('DOMContentLoaded', () => {
  const scene = document.getElementById('scene')
  const vrBtn = document.getElementById('vrToggle')
  const camera = document.getElementById('camera')

  let vrOn = false

  vrBtn.onclick = () => {
    vrOn = !vrOn

    if (vrOn) {
      scene.enterVR()
      camera.setAttribute('look-controls', 'enabled:true')
      vrBtn.innerText = 'Exit VR'
    } else {
      scene.exitVR()
      camera.setAttribute('look-controls', 'enabled:false')
      vrBtn.innerText = 'Enter VR'
    }
  }

  window.showVRButton = () => {
    vrBtn.style.display = 'block'
  }
})
