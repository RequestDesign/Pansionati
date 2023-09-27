import { scroolMapList } from './functions.js';

function changeHideClass(item, attr, el) {
  if (item === attr) {
    el.classList.add('hide');
  } else {
    el.classList.remove('hide');
  }
}

function changeContentMap() {
  const contents = document.querySelectorAll('[data-content]');
  contents.forEach((content) => {
    if (window.innerWidth < 768) {
      content.classList.add('hide');
    } else {
      content.classList.remove('hide');
    }

    if (content.getAttribute('data-content') === 'list') {
      content.classList.remove('hide');
    }

    document.querySelector('.js-maps-maps').classList.add('hide');
  });
}

function scroolListWithBoard() {
  const boardsContainer = document.querySelector('.maps__list-items');
  const boardListActive = document.querySelector('.maps__list-item.active');

  if (boardsContainer && boardListActive) {
    scroolMapList(boardsContainer, boardListActive);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  changeContentMap();

  const btns = document.querySelectorAll('.js-btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const contentBtn = event.currentTarget.getAttribute('data-open-content');
      const contents = document.querySelectorAll('[data-content]');
      const activeContent = document.querySelectorAll(`[data-content=${contentBtn}]`);

      contents.forEach((cont) => cont.classList.add('hide'));
      activeContent.forEach((content) => content.classList.remove('hide'));

      btns.forEach((button) => {
        const item = button.getAttribute('data-open-content');
        changeHideClass(item, contentBtn, button);
      });

      scroolListWithBoard();
    });
  });
});

window.addEventListener('resize', () => {
  changeContentMap();
});
