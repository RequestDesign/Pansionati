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

document.addEventListener('DOMContentLoaded', () => {
  changeContentMap();

  const btns = document.querySelectorAll('.js-btn');

  btns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const contentBtn = event.currentTarget.getAttribute('data-open-content');
      const contents = document.querySelectorAll('[data-content]');
      const activeContent = document.querySelectorAll(`[data-content=${contentBtn}]`);

      contents.forEach((cont) => {
        cont.classList.add('hide');
      });

      activeContent.forEach((content) => {
        content.classList.remove('hide');
      });

      btns.forEach((button) => {
        if (button.getAttribute('data-open-content') === contentBtn) {
          button.classList.add('hide');
        } else {
          button.classList.remove('hide');
        }
      });
    });
  });
});

window.addEventListener('resize', () => {
  changeContentMap();
});
