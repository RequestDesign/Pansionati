import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

function initSliders() {
  // Свайпер внутри карточки
  if (document.querySelectorAll('.js-cards')) {
    document.querySelectorAll('.js-cards').forEach((cards) => {
      cards.querySelectorAll('.js-card__slider').forEach((card) => {
        const slider = card.querySelector('.js-card__swiper');
        const pagination = card.querySelector('.js-card__bullets');

        new Swiper(slider, {
          modules: [Navigation, Pagination],
          slidesPerView: 1,
          allowTouchMove: true,
          pagination: {
            el: pagination,
            clickable: true,
          },
        });
      });
    });

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
          watchSlidesProgress: true,
          spaceBetween: 30,
          navigation: {
            nextEl: btnNext,
            prevEl: btnPrev,
          },
          pagination: {
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
          },
          on: {
            paginationUpdate() {
              const dots = this.pagination.bullets;
              dots.forEach((dot) => dot.classList.remove('hide'));

              const current = this.activeIndex;
              const total = this.slides.length - 2;

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
        pagination: {
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
        },
        on: {
          paginationUpdate() {
            const dots = this.pagination.bullets;
            dots.forEach((dot) => dot.classList.remove('hide'));

            const current = this.activeIndex;
            const total = this.slides.length;

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
                console.log('1');
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

window.addEventListener('DOMContentLoaded', () => {
  initSliders();
});

window.addEventListener('resize', () => {
  initSliders();
});
