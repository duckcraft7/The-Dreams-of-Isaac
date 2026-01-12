window.addEventListener('DOMContentLoaded', () => {
  const scene = document.querySelector('#scene')
  const button = document.querySelector('#vrButton')
  const camera = document.querySelector('#camera')

  let vrEnabled = false

  button.onclick = () => {
    vrEnabled = !vrEnabled

    if (vrEnabled) {
      camera.setAttribute('look-controls', 'enabled: true')
      scene.enterVR()
      button.innerText = 'SAIR DO VR'
    } else {
      camera.setAttribute('look-controls', 'enabled: false')
      scene.exitVR()
      button.innerText = 'ENTRAR EM VR'
    }
  }
})
