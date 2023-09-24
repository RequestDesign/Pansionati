const PLACEMARKS = [
  {
    lalitude: 55.520003,
    longitude: 38.089062,
    balloonContent: 'ballon 1',
    attr: 'board-1',
  },
  {
    lalitude: 55.52023,
    longitude: 38.189062,
    balloonContent: 'ballon 2',
    attr: 'board-2',
  },
  {
    lalitude: 55.540003,
    longitude: 38.289062,
    balloonContent: 'ballon 3',
    attr: 'board-3',
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
          balloonContent: placemark.balloonContent,
          myDataAttr: placemark.attr,
        },
        {
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

        newPlacemark.options.set('iconImageHref', './img/icons/location-pin-active.svg');
      });
    });

    mainMap.controls.remove('geolocationControl');
    mainMap.controls.remove('searchControl');
    mainMap.controls.remove('trafficControl');
    mainMap.controls.remove('typeSelector');
    mainMap.controls.remove('rulesControl');
    mainMap.behaviors.disable(['scrollZoom']);
  }
}

ymaps.ready(init);
