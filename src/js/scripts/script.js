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

  function clickToogleBlockCards() {
    const btns = document.querySelectorAll('.js-cards-btns button');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((bt) => bt.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }

  function scrollPage() {
    const btnScroll = document.querySelector('.js-btn-scroll');

    btnScroll.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  function clickFullText() {
    const btnTextFull = document.querySelector('.js-about-full');
    const txt = document.querySelector('.js-about-txt');
    const contentHeight = txt.scrollHeight;

    btnTextFull.addEventListener('click', () => {
      if (btnTextFull.classList.contains('__full')) {
        txt.style.height = `${contentHeight}px`;
        btnTextFull.textContent = 'Свернуть';
        btnTextFull.classList.remove('__full');
      } else {
        console.log(window.innerWidth);
        if (window.innerWidth < 768) {
          txt.style.height = '36rem';
        } else {
          txt.style.height = '21.6rem';
        }
        btnTextFull.textContent = 'Развернуть';
        btnTextFull.classList.add('__full');
      }
    });
  }

  setPhoneMask();
  clickToogle();
  clickToogleBlockCards();
  scrollPage();
  clickFullText();
  toggleBlockContent();
});
