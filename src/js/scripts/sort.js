function sortActions() {
  if (window.innerWidth < 768) {
    const sorts = document.querySelectorAll('.js-sort-open');

    if (sorts) {
      const sortContent = document.querySelector('.js-sort-content');
      const sortItems = document.querySelectorAll('.js-sort-item');
      const sortValues = document.querySelectorAll('.js-sort-value');

      sorts.forEach((sort) => {
        sort.addEventListener('click', () => {
          sortContent.classList.add('active');
        });
      });

      sortItems.forEach((sortItem) => {
        sortItem.addEventListener('click', () => {
          sortValues.forEach((sortValue) => {
            sortValue.textContent = sortItem.textContent.trim();
          });
        });
      });

      document.addEventListener('click', (event) => {
        if (event.target.closest('.js-sort')) {
          sortContent.classList.remove('active');
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', sortActions);
document.addEventListener('resize', sortActions);
