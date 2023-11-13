function clickToogleBlockCards() {
  const btns = document.querySelectorAll('.js-cards-btns button');

  if (btns) {
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((bt) => bt.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  }
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
        $('html, body').animate(
          {
            scrollTop: $('.js-about-txt').offset().top - 140,
          },
          500,
          () => {
            if (window.innerWidth < 768) {
              txt.style.height = '36rem';
            } else {
              txt.style.height = '21.6rem';
            }
            btnTextFull.textContent = 'Развернуть';
            btnTextFull.classList.add('__full');
          }
        );
      }
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

function clickToogle() {
  const toggleElements = document.querySelectorAll('.js-toggle');

  if (toggleElements) {
    toggleElements.forEach((element) => {
      element.addEventListener('click', () => {
        element.classList.toggle('active');
      });
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
      const content = document.querySelector('.sort');
      content.classList.add('active');
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  clickToogle();
  clickToogleBlockCards();
  clickFullText();
  clickFilter();
  clickFilt();
  clickSort();
});
