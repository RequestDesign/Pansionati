export function scroolMapList(container, el) {
  const distance = el.offsetTop - container.offsetTop;

  container.scroll({
    top: distance,
    behavior: 'smooth',
  });
}

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
  const fixedElement = document.querySelector('.board-main__btn ');

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

    if (top < 100) {
      catalogHeader.classList.remove('scroll');
    } else {
      catalogHeader.classList.add('scroll');
    }
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
});
