import './styles.css'

const img = document.querySelector('.section1-img-js');

document.querySelector('.section1-dot1-js').addEventListener('click', () => {
    img.style.backgroundImage = url('img1.jpg');
  })

document.querySelector('.section1-dot2-js').addEventListener('click', () => {
    img.style.backgroundImage = url('img2.jpg');
  })

document.querySelector('.section1-dot3-js').addEventListener('click', () => {
    img.style.backgroundImage = url('img3.jpg');
  })

