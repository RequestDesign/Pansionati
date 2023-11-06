const btnsBurger = document.querySelectorAll('.js-burger-open');
const menuBurger = document.querySelector('.js-burger-menu');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const { body } = document;

function openBurgerMenu() {
  btnsBurger.forEach((btn) => {
    btn.addEventListener('click', () => {
      menuBurger.classList.add('active');
      overlay.classList.add('active');
      body.classList.add('lock');

      if (header) {
        header.style.zIndex = '6';
      }
    });
  });
}

function closeBurgerMenu() {
  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay')) {
      menuBurger.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('lock');

      setTimeout(() => {
        header.style.zIndex = '';
      }, 0);
    }
  });
}

const scrollHeader = () => {
  window.onscroll = () => {
    if (window.pageYOffset > 6) {
      header.classList.add('scroll');
    } else {
      header.classList.remove('scroll');
    }
  };
};

const scrollHeaderLoad = () => {
  if (window.pageYOffset >= 6) {
    header.classList.add('scroll');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  openBurgerMenu();
  closeBurgerMenu();
  scrollHeaderLoad();
  scrollHeader();
});
