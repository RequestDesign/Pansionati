const search = document.querySelector('.js-search');

function setPlaceholder() {
  if (search) {
    const input = search.querySelector('input');

    if (window.innerWidth > 768 && input) {
      input.placeholder = 'Поиск по домам престарелых, направлениям, условиям и другое';
    }
  }
}

function showSearch() {
  if (search) {
    const inputBlock = search.querySelector('.input');
    const input = search.querySelector('input');
    const btnReset = search.querySelector('.js-search-reset');

    inputBlock.addEventListener('click', () => {
      input.focus();
      search.classList.add('active');
    });

    btnReset.addEventListener('click', () => {
      input.value = '';
    });

    document.addEventListener('mousedown', (event) => {
      if (!event.target.closest('.js-search')) {
        search.classList.remove('active');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showSearch();
  setPlaceholder();
});
