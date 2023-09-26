const PLACEMARKS = [
  {
    lalitude: 55.520003,
    longitude: 38.089062,
    balloonContent: {
      img: '../img/boards/board-mayak.png',
      title: 'Дом престарелых "Маяк"',
      address: 'Посёлок Раменской Агрохимстанции, 5Д',
    },
    attr: 'board-1',
  },
  {
    lalitude: 55.52023,
    longitude: 38.189062,
    balloonContent: {
      img: '../img/boards/board-moscow.png',
      title: 'Дом престарелых "Московский"',
      address: 'Город Москва, 5Д',
    },
    attr: 'board-2',
  },
  {
    lalitude: 55.540003,
    longitude: 38.289062,
    balloonContent: {
      img: '../img/boards/board-mayak.png',
      title: 'Дом престарелых «Химки»',
      address: 'Город: Химки',
    },
    attr: 'board-3',
  },
  {
    lalitude: 55.62423,
    longitude: 38.280062,
    balloonContent: {
      img: '../img/boards/board-mayak.png',
      title: 'Пансионат Бронинцы',
      address: 'Город: Бронинцы',
    },
    attr: 'board-4',
  },
];

function removeContent(mainMap) {
  mainMap.controls.remove('geolocationControl');
  mainMap.controls.remove('searchControl');
  mainMap.controls.remove('trafficControl');
  mainMap.controls.remove('typeSelector');
  mainMap.controls.remove('rulesControl');
}

function animationMap(placemark, map) {
  map.panTo([placemark[0] - 0.08, placemark[1]], {
    flying: true,
    duration: 1000,
  });
}

function createBalloon(placemark) {
  return `
                <div class="map__balloon">
                  <div class="map__balloon-img --desc">
                    <img class="map__balloon-img" src="${placemark.balloonContent.img}" alt="">
                  </div>
                  <div class="map__balloon-img --mob">
                    <img class="map__balloon-img" src="${placemark.balloonContent.imgMob}" alt="">
                  </div>
                  <div class="map__balloon-content">
                    <div class="map__balloon-title">
                      ${placemark.balloonContent.title}
                    </div>
                    <div class="map__balloon-address">
                      ${placemark.balloonContent.address}
                    </div>
                  </div>
                </div>
              `;
}

function changeActiveClass(item, attr, el) {
  if (item === attr) {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  function init() {
    if (document.querySelector('.mainpage .map')) {
      const boardsItems = document.querySelectorAll('[data-board-map]');
      const boardsDescContainer = document.querySelector('.map-descs');

      const mainMap = new ymaps.Map('map', {
        center: [55.520003, 38.089062],
        zoom: 10,
      });

      PLACEMARKS.forEach((placemark) => {
        const newPlacemark = new ymaps.Placemark(
          [placemark.lalitude, placemark.longitude],
          {
            balloonContent: createBalloon(placemark),
            myDataAttr: placemark.attr,
          },
          {
            hideIconOnBalloonOpen: false,
            iconLayout: 'default#image',
            iconImageHref: './img/icons/location-pin-default.svg',
            icon_imagesize: [62, 62],
            iconImageOffset: [-20, -30],
          }
        );

        boardsItems.forEach((boardItem) => {
          boardItem.addEventListener('click', () => {
            const attr = boardItem.getAttribute('data-board-map');
            boardsDescContainer.classList.add('active');

            if (window.innerWidth < 768) {
              const lists = document.querySelectorAll('.js-maps-list');
              const maps = document.querySelectorAll('.js-maps-maps');

              lists.forEach((list) => list.classList.add('hide'));
              maps.forEach((map) => map.classList.remove('hide'));
            }

            if (newPlacemark.properties.get('myDataAttr') === attr) {
              mainMap.geoObjects.each((geoObject) => {
                if (geoObject.properties.get('myDataAttr') === attr) {
                  geoObject.options.set('iconImageHref', './img/icons/location-pin-active.svg');
                  geoObject.balloon.open();
                  animationMap(geoObject.geometry._coordinates, mainMap);
                } else {
                  geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg');
                }
              });
            }

            boardsItems.forEach((boardsItem) => {
              const item = boardsItem.getAttribute('data-board-map');
              changeActiveClass(item, attr, boardsItem);
            });
          });
        });

        mainMap.geoObjects.add(newPlacemark);

        newPlacemark.events.add('click', () => {
          mainMap.geoObjects.each((geoObject) =>
            geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg')
          );

          boardsDescContainer.classList.add('active');

          boardsItems.forEach((boardItem) => {
            const attr = boardItem.getAttribute('data-board-map');
            const item = newPlacemark.properties.get('myDataAttr');
            changeActiveClass(item, attr, boardItem);
          });

          animationMap([placemark.lalitude, placemark.longitude], mainMap);

          newPlacemark.options.set('iconImageHref', './img/icons/location-pin-active.svg');
        });
      });

      removeContent(mainMap);
    }
  }

  ymaps.ready(init);
});
