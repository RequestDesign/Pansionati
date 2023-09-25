document.addEventListener('DOMContentLoaded', () => {
  const PLACEMARKS = [
    {
      lalitude: 55.520003,
      longitude: 38.089062,
      balloonContent: {
        img: '../../img/boards/board-mayak.png',
        title: 'Дом престарелых "Маяк"',
        address: 'Посёлок Раменской Агрохимстанции, 5Д',
      },
      attr: 'board-1',
    },
    {
      lalitude: 55.52023,
      longitude: 38.189062,
      balloonContent: {
        img: '../../img/boards/board-moscow.png',
        title: 'Дом престарелых "Московский"',
        address: 'Город Москва, 5Д',
      },
      attr: 'board-2',
    },
    {
      lalitude: 55.540003,
      longitude: 38.289062,
      balloonContent: {
        img: '../../img/boards/board-mayak.png',
        title: 'Дом престарелых «Химки»',
        address: 'Город: Химки',
      },
      attr: 'board-3',
    },
    {
      lalitude: 55.62423,
      longitude: 38.280062,
      balloonContent: {
        img: '../../img/boards/board-mayak.png',
        title: 'Пансионат Бронинцы',
        address: 'Город: Бронинцы',
      },
      attr: 'board-4',
    },
  ];

  function init() {
    if (document.querySelector('.mainpage .map')) {
      const mainMap = new ymaps.Map('map', {
        center: [55.520003, 38.089062],
        zoom: 10,
      });

      PLACEMARKS.forEach((placemark) => {
        const newPlacemark = new ymaps.Placemark(
          [placemark.lalitude, placemark.longitude],
          {
            balloonContent: `
                <div class="map__balloon">
                  <div class="map__balloon-img">
                    <img class="map__balloon-img" src="${placemark.balloonContent.img}" alt="">
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
              `,
            balloonContentOffset: [-100, -100],
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

        const boardsItems = document.querySelectorAll('[data-board-map]');
        const boardsDescContainer = document.querySelector('.map-descs');

        boardsItems.forEach((boardItem) => {
          boardItem.addEventListener('click', () => {
            const attr = boardItem.getAttribute('data-board-map');
            boardsDescContainer.classList.add('active');

            if (window.innerWidth < 768) {
              const lists = document.querySelectorAll('.js-maps-list');
              const maps = document.querySelectorAll('.js-maps-maps');

              lists.forEach((list) => {
                list.classList.add('hide');
              });

              maps.forEach((map) => {
                map.classList.remove('hide');
              });
            }

            if (newPlacemark.properties.get('myDataAttr') === attr) {
              mainMap.geoObjects.each((geoObject) => {
                if (geoObject.properties.get('myDataAttr') === attr) {
                  geoObject.options.set('iconImageHref', './img/icons/location-pin-active.svg');
                }
              });
            }

            for (let i = 0; i < boardsItems.length; i += 1) {
              if (boardsItems[i].getAttribute('data-board-map') === attr) {
                boardsItems[i].classList.add('active');
              } else {
                boardsItems[i].classList.remove('active');
              }
            }
          });
        });

        mainMap.geoObjects.add(newPlacemark);

        newPlacemark.events.add('click', () => {
          mainMap.geoObjects.each((geoObject) => {
            geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg');
          });

          const boardItems = document.querySelectorAll('[data-board-map]');
          const boardDescContainer = document.querySelector('.map-descs');
          boardDescContainer.classList.add('active');

          boardItems.forEach((boardItem) => {
            const attr = boardItem.getAttribute('data-board-map');

            if (newPlacemark.properties.get('myDataAttr') === attr) {
              boardItem.classList.add('active');
            } else {
              boardItem.classList.remove('active');
            }
          });

          mainMap.setCenter([placemark.lalitude - 0.07, placemark.longitude]);

          newPlacemark.options.set('iconImageHref', './img/icons/location-pin-active.svg');
        });
      });

      mainMap.controls.remove('geolocationControl');
      mainMap.controls.remove('searchControl');
      mainMap.controls.remove('trafficControl');
      mainMap.controls.remove('typeSelector');
      mainMap.controls.remove('rulesControl');

      if (window.innerWidth > 768) {
        mainMap.behaviors.disable(['scrollZoom']);
      }
    }
  }

  ymaps.ready(init);
});
