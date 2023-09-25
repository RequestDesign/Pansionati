document.addEventListener('DOMContentLoaded', () => {
  const btnBurger = document.querySelector('.js-burger-open');
  const menuBurger = document.querySelector('.js-burger-menu');
  const overlay = document.querySelector('.overlay');
  const { body } = document;

  btnBurger.addEventListener('click', () => {
    menuBurger.classList.add('active');
    overlay.classList.add('active');
    body.classList.add('lock');
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('overlay')) {
      menuBurger.classList.remove('active');
      overlay.classList.remove('active');
      body.classList.remove('lock');
    }
  });
});
