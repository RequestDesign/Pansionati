document.addEventListener('DOMContentLoaded', () => {
  function focusInput() {
    const inputs = document.querySelectorAll('.input');

    inputs.forEach((input) => {
      input.addEventListener('click', () => {
        console.log(input);
        const inp = input.querySelector('input');
        inp.focus();
      });
    });
  }

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

  function clickFullText() {
    const btnTextFull = document.querySelector('.js-about-full');
    const txt = document.querySelector('.js-about-txt');

    if (btnTextFull) {
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
  }

  function clickScrollMap() {
    const btn = document.querySelector('.js-scroll-map');

    if (btn) {
      btn.addEventListener('click', () => {
        const map = document.querySelector('.maps');
        map.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function clickFilter() {
    const btnFilterOpen = document.querySelector('.js-filter-open');
    const btnFilterClose = document.querySelector('.js-filter-close');

    if (btnFilterOpen) {
      btnFilterOpen.addEventListener('click', () => {
        const content = document.querySelector('.js-maps-filter');
        content.classList.add('active');
      });
    }

    if (btnFilterClose) {
      btnFilterClose.addEventListener('click', () => {
        const content = document.querySelector('.js-maps-filter');
        content.classList.remove('active');
      });
    }
  }

  function clickFilt() {
    const btnsFilterOpen = document.querySelectorAll('.js-filt-open');
    const btnFilterClose = document.querySelector('.js-filt-close');

    if (btnsFilterOpen) {
      btnsFilterOpen.forEach((btn) => {
        btn.addEventListener('click', () => {
          const content = document.querySelector('.js-filt-content');
          content.classList.add('active');
        });
      });
    }

    if (btnFilterClose) {
      btnFilterClose.addEventListener('click', () => {
        const content = document.querySelector('.js-filt-content');
        content.classList.remove('active');
      });
    }
  }

  function clickSort() {
    const btnSortOpen = document.querySelector('.js-sort-open');

    if (btnSortOpen) {
      btnSortOpen.addEventListener('click', () => {
        const content = document.querySelector('.js-sort-content');
        content.classList.add('active');
      });

      document.addEventListener('click', (event) => {
        if (event.target.closest('.js-sort-content')) {
          const content = document.querySelector('.js-sort-content');
          content.classList.remove('active');
        }
      });
    }
  }

  setPhoneMask();
  clickToogle();
  clickToogleBlockCards();
  clickFullText();
  clickScrollMap();
  clickFilter();
  clickFilt();
  clickSort();
  focusInput();
});
