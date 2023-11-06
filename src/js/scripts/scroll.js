document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', () => {
    const search = document.querySelector('.js-sear');
    const { top } = search.getBoundingClientRect();

    if (top <= 0) {
      search.classList.add('scroll');
    } else {
      search.classList.remove('scroll');
    }
  });
});
