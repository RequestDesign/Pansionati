function scrollPage() {
  const btnScroll = document.querySelector('.js-btn-scroll');

  if (btnScroll) {
    btnScroll.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }
}

function changeShowBtnBoard() {
  const fixedElement = document.querySelector('.bottom-zakrep');

  if (fixedElement) {
    const footer = document.querySelector('.footer');
    const fixedElementBottom = fixedElement.getBoundingClientRect().bottom + window.pageYOffset;
    const footerTop = footer.getBoundingClientRect().top + window.pageYOffset;

    if (fixedElementBottom >= footerTop) {
      fixedElement.classList.add('scroll');
    } else {
      fixedElement.classList.remove('scroll');
    }
  }
}

function changeShowPanelCatalogHeader() {
  const mapsCatalog = document.querySelector('.maps-catalog');

  if (mapsCatalog) {
    const { top } = mapsCatalog.getBoundingClientRect();
    const catalogHeader = document.querySelector('.js-catalog-header');
    const header = document.querySelector('.header');
    const catalogPage = document.querySelector('.catalog-page');

    if (top < 100) {
      catalogHeader.classList.remove('scroll');
      header.style.position = '';
      catalogPage.style.marginTop = '';
    } else {
      catalogHeader.classList.add('scroll');
      header.style.position = 'relative';
      catalogPage.style.marginTop = '0';
    }
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

function changeShowPanelFilt() {
  const search = document.querySelector('.js-sear');

  if (search) {
    const { top } = search.getBoundingClientRect();

    if (top <= 0) {
      search.classList.add('scroll');
    } else {
      search.classList.remove('scroll');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
      changeShowPanelFilt();
    } else {
      changeShowBtnBoard();
      changeShowPanelCatalogHeader();
    }
  });
  changeShowBtnBoard();
  changeShowPanelCatalogHeader();
  scrollPage();
  clickScrollMap();
});
