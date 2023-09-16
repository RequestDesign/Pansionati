document.addEventListener('DOMContentLoaded', () => {
  function clickToogle() {
    const toggleElements = document.querySelectorAll('.js-toggle');

    toggleElements.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('active');
      });
    });
  }

  function setPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach((phoneInput) => {
      const im = new Inputmask('+7 (999) 999-99-99');
      im.mask(phoneInput);
    });
  }

  setPhoneMask();
  clickToogle();
});
