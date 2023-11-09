import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function initSliders() {
  function updatePagination(el, minusNumber) {
    const dots = el.pagination.bullets;
    dots.forEach((dot) => dot.classList.remove('hide'));

    const current = el.activeIndex;
    let total = 0;

    if (minusNumber) {
      total = el.slides.length - 2;
    } else {
      total = el.slides.length;
    }

    const start = 0;
    const end = total - 1;

    if (total > 7) {
      if (current === start || current === start + 1) {
        for (let i = 3; i < end; i++) {
          dots[i].classList.add('hide');
        }
        dots[start].classList.remove('show');
        dots[end].classList.add('show');
      } else if (current === start + 2 || current === start + 3) {
        dots.forEach((dot) => dot.classList.add('hide'));
        dots[start].classList.remove('show');
        dots[end].classList.add('show');
        dots[start].classList.remove('hide');
        dots[end].classList.remove('hide');
        for (let i = current - 2; i <= current + 1; i++) {
          dots[i].classList.remove('hide');
        }
      } else if (current === end) {
        for (let i = start + 1; i < end - 2; i++) {
          dots[i].classList.add('hide');
        }
        dots[start].classList.add('show');
        dots[end].classList.remove('show');
      } else if (current === end - 3 || current === end - 2 || current === end - 1) {
        for (let i = start + 1; i < current - 1; i++) {
          dots[i].classList.add('hide');
        }
        dots[start].classList.add('show');
        dots[end].classList.remove('show');
      } else {
        dots.forEach((dot) => dot.classList.add('hide'));
        dots[start].classList.add('show');
        dots[end].classList.add('show');
        dots[start].classList.remove('hide');
        dots[end].classList.remove('hide');
        for (let i = current - 1; i <= current + 1; i++) {
          dots[i].classList.remove('hide');
        }
      }
    }
  }

  function setPagination(pagination) {
    return {
      el: pagination,
      clickable: true,
      renderBullet(index, className) {
        const total = this.slides.length - 2;
        if (index === 0) {
          return `
              <span class="${className}">${index + 1}</span>
            `;
        }
        if (index === total - 1) {
          return `
              <span class="${className}">${index + 1}</span>
            `;
        }
        return `<span class="${className}">${index + 1}</span>`;
      },
    };
  }

  // Свайпер внутри карточки каталога
  if (document.querySelectorAll('.js-cards-catalog')) {
    document.querySelectorAll('.js-cards-catalog').forEach((cards) => {
      cards.querySelectorAll('.js-card__slider').forEach((card) => {
        const slider = card.querySelector('.js-card__swiper');
        const pagination = card.querySelector('.js-card__bullets');

        new Swiper(slider, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 20,
          allowTouchMove: true,
          pagination: {
            el: pagination,
            clickable: true,
          },
        });
      });
    });
  }

  // Свайпер внутри карточки
  if (document.querySelectorAll('.js-cards')) {
    document.querySelectorAll('.js-cards').forEach((cards) => {
      cards.querySelectorAll('.js-card__slider').forEach((card) => {
        const slider = card.querySelector('.js-card__swiper');
        console.log(card.parentElement.querySelector('.js-card__bullets'));
        const pagination = card.parentElement.querySelector('.js-card__bullets');

        new Swiper(slider, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          spaceBetween: 20,
          touch: true,
          // nested: true,
          // direction: 'horizontal',
          allowTouchMove: true,
          pagination: {
            el: pagination,
            clickable: true,
          },
        });
      });
    });

    if (document.querySelector('.js-plush-slider')) {
      document.querySelectorAll('.js-plush-slider').forEach((slider) => {
        console.log(slider);

        new Swiper(slider, {
          slidesPerView: 'auto',
          allowTouchMove: true,
          watchSlidesProgress: true,
          touchStart: true,
          spaceBetween: 8,
          nested: true,
          speed: 1000,
        });
      });
    }

    if (document.querySelector('.js-icons-slider')) {
      document.querySelectorAll('.js-icons-slider').forEach((slider) => {
        console.log(slider);

        new Swiper(slider, {
          slidesPerView: 'auto',
          allowTouchMove: true,
          watchSlidesProgress: true,
          touchStart: true,
          spaceBetween: 28,
          nested: true,
          speed: 1000,
        });
      });
    }

    // Свайпер карточек
    document.querySelectorAll('.js-cards').forEach((cards, index) => {
      if (document.body.offsetWidth > 768) {
        const slider = cards;
        const pagination = cards.querySelector('.js-cards__bullets');
        const btnPrev = cards.querySelector('.js-cards-prev');
        const btnNext = cards.querySelector('.js-cards-next');

        const cardSwiper = new Swiper(slider, {
          modules: [Navigation, Pagination],
          slidesPerView: 3,
          allowTouchMove: true,
          touch: true,
          watchSlidesProgress: true,
          // nested: true,
          // direction: 'horizontal',
          spaceBetween: 30,
          navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
          },
          pagination: setPagination(pagination),
          on: {
            paginationUpdate() {
              updatePagination(this, true);
            },
          },
        });
      } else {
        if (cards.swiper) {
          cards.swiper.destroy();
        }
      }
    });
  }

  document.querySelectorAll('.js-reviews').forEach((cards, index) => {
    if (document.body.offsetWidth > 768) {
      const slider = cards;
      const pagination = cards.parentElement.querySelector('.js-cards__bullets');
      const btnPrev = cards.parentElement.querySelector('.js-cards-prev');
      const btnNext = cards.parentElement.querySelector('.js-cards-next');

      const cardSwiper = new Swiper(slider, {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        allowTouchMove: true,
        watchSlidesProgress: true,
        spaceBetween: 30,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        pagination: setPagination(pagination),
        on: {
          paginationUpdate() {
            updatePagination(this, false);
          },
        },
      });
    } else {
      if (cards.swiper) {
        cards.swiper.destroy();
      }
    }
  });

  document.querySelectorAll('.js-reviews-2').forEach((cards, index) => {
    if (document.body.offsetWidth > 768) {
      const slider = cards;
      const pagination = cards.querySelector('.js-cards__bullets');
      const btnPrev = cards.querySelector('.js-cards-prev');
      const btnNext = cards.querySelector('.js-cards-next');

      const cardSwiper = new Swiper(slider, {
        modules: [Navigation, Pagination],
        slidesPerView: 3,
        allowTouchMove: true,
        watchSlidesProgress: true,
        spaceBetween: 30,
        speed: 1000,
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },
        pagination: setPagination(pagination),
        on: {
          paginationUpdate() {
            updatePagination(this, true);
          },
        },
      });
    } else {
      if (cards.swiper) {
        cards.swiper.destroy();
      }
    }
  });

  if (document.querySelector('.board-gallery__slider') && window.innerWidth < 768) {
    new Swiper('.board-gallery__swiper', {
      modules: [Pagination],
      slidesPerView: 1,
      allowTouchMove: true,
      spaceBetween: 30,
      pagination: {
        el: '.board-gallery__bullets',
        clickable: true,
      },
    });
  }
}

window.addEventListener('DOMContentLoaded', initSliders);
window.addEventListener('resize', initSliders);
