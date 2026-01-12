window.addEventListener('DOMContentLoaded', () => {
  const menu = document.getElementById('menu')
  const startBtn = document.getElementById('startGame')

  startBtn.onclick = () => {
    menu.style.display = 'none'

    // mostra botão VR
    if (window.showVRButton) {
      window.showVRButton()
    }
  }
})
