function focusInput() {
  const inputs = document.querySelectorAll('.input');

  if (inputs) {
    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        const inp = input.querySelector('input');
        inp.focus();
      });
    });
  }
}

function setPhoneMask() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');

  if (phoneInputs) {
    phoneInputs.forEach((phoneInput) => {
      const im = new Inputmask('+7 (999) 999-99-99');
      im.mask(phoneInput);
    });
  }
}

function changeQuestions() {
  $('.about-questions__block').each(function () {
    $(this).on('click', function () {
      $(this).find('.about-questions__inner').toggleClass('__full');
      $(this).find('.about-questions__txt').slideToggle();
    });
  });
}

function sortAppend() {
  if (window.innerWidth < 768) {
    const main = document.querySelector('main');
    const sort = document.querySelector('.js-sort');
    const container = document.createElement('div');
    container.classList.add('select-sort', 'js-sort');
    container.appendChild(sort);
    main.appendChild(container);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  focusInput();
  setPhoneMask();
  changeQuestions();
  sortAppend();
});
