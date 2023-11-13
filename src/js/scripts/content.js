function changeContentAboutBoard() {
  const btns = document.querySelectorAll('.js-open-content');
  const contents = document.querySelectorAll('.js-about-content');

  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      btns.forEach((bt) => bt.classList.remove('active'));
      contents.forEach((content) => content.classList.remove('active'));
      btn.classList.add('active');

      const attr = btn.getAttribute('data-open-content');

      contents.forEach((content) => {
        if (content.getAttribute('data-about-content') === attr) {
          content.classList.add('active');
        }
      });
    });
  });
}

function changeHideClass(item, attr, el) {
  if (item === attr) {
    el.classList.add('hide');
  } else {
    el.classList.remove('hide');
  }
}

function scroolListWithBoard() {
  const boardsContainer = document.querySelector('.maps__list-items');
  const boardListActive = document.querySelector('.maps__list-item.active');

  if (boardsContainer && boardListActive) {
    scroolMapList(boardsContainer, boardListActive);
  }
}

function changeContentMap() {
  const contents = document.querySelectorAll('[data-content]');
  contents.forEach((content) => {
    if (document.body.clientWidth < 769) {
      content.classList.add('hide');
    } else {
      content.classList.remove('hide');
    }

    if (content.getAttribute('data-content') === 'list') {
      content.classList.remove('hide');
    }

    if (document.querySelector('.js-maps-maps')) {
      document.querySelector('.js-maps-maps').classList.add('hide');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  changeContentAboutBoard();
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
				scroolListWithBoard();
      });
    });
  });
});
