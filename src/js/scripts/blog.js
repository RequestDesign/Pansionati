const TEXT_ONE_LINE = 30;
const TEXT_TWO_LINE = 60;

function changeText() {
  const blogCards = document.querySelectorAll('.js-blog-card');

  blogCards.forEach((blogCard) => {
    const title = blogCard.querySelector('.blog-card__title');
    const text = blogCard.querySelector('.blog-card__text');

    if (title.offsetHeight < TEXT_ONE_LINE) {
      text.style.webkitLineClamp = '3';
    } else if (title.offsetHeight > TEXT_ONE_LINE && title.offsetHeight < TEXT_TWO_LINE) {
      text.style.webkitLineClamp = '2';
    } else {
      text.style.webkitLineClamp = '1';
    }
  });
}

document.addEventListener('DOMContentLoaded', changeText);
