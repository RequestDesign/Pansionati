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

    mainMap.geoObjects.add(newPlacemark);

    newPlacemark.events.add('click', () => {
      mainMap.geoObjects.each((geoObject) => {
        geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg');
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

ymaps.ready(init);
