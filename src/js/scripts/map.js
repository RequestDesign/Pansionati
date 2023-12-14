// Scrollbat для списка пансионатов в карте

export let scrollbar;

if (document.querySelector('.maps__list-items')) {
  const outerBlock = document.querySelector('.maps__list-items');
  scrollbar = new SimpleBar(outerBlock);
}

// Метки для карты со всеми пансионатами
const PLACEMARKS = [
  {
    lalitude: 55.520003,
    longitude: 38.089062,
    balloonContent: {
      img: './img/boards/board-mayak.png',
      title: 'Дом престарелых "Маяк"',
      address: 'Посёлок Раменской Агрохимстанции, 5Д',
    },
    attr: 'board-1',
  },
  {
    lalitude: 55.52023,
    longitude: 38.189062,
    balloonContent: {
      img: './img/boards/board-moscow.png',
      title: 'Дом престарелых "Московский"',
      address: 'Город Москва, 5Д',
    },
    attr: 'board-2',
  },
  {
    lalitude: 55.540003,
    longitude: 38.289062,
    balloonContent: {
      img: './img/boards/board-mayak.png',
      title: 'Дом престарелых «Химки»',
      address: 'Город: Химки',
    },
    attr: 'board-3',
  },
  {
    lalitude: 55.62423,
    longitude: 38.280062,
    balloonContent: {
      img: './img/boards/board-mayak.png',
      title: 'Пансионат Бронинцы',
      address: 'Город: Бронинцы',
    },
    attr: 'board-4',
  },
];

// Метка для карты контактов
const PLACEMARK_CONTACT = {
  lalitude: 55.679798,
  longitude: 37.623402,
  // balloonContent: {
  //   img: './img/boards/board-mayak.png',
  //   title: 'Дом престарелых "Маяк"',
  //   address: 'Варшавское шоссе, 36с.2, Москва',
  // },
};

// Метка для карты карточки пансионата
const PLACEMARK_BOARD = {
  lalitude: 55.497103,
  longitude: 37.782683,
  balloonContent: {
    img: './img/boards/board-garmonia.png',
    title: 'Пансионат «Гармония жизни» в Москве, ул. Тенистая',
    address: 'Город Домодедово, СНТ Искра-Старосьяново, Берёзовая улица, 4',
  },
};

function removeContent(mainMap) {
  mainMap.controls.remove('geolocationControl');
  mainMap.controls.remove('searchControl');
  mainMap.controls.remove('trafficControl');
  mainMap.controls.remove('typeSelector');
  mainMap.controls.remove('rulesControl');
}

function animationMap(placemark, map) {
  const options = {
    flying: true,
    duration: 1000,
  };

  if (window.innerWidth > 768) {
    map.panTo([placemark[0], placemark[1]], options);
  } else {
    map.panTo([placemark[0] - 0.08, placemark[1]], options);
  }
}

function createBalloon(placemark) {
  return `
    <div class="map__balloon" data-board-map="${placemark.attr}">
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

function changeActiveClass(attrEl, attr, el) {
  if (attrEl === attr) {
    el.classList.add('active');
  } else {
    el.classList.remove('active');
  }
}

// Код для карты со всеми пансионатами
function init() {
  if (document.querySelector('.mapMain')) {
    const boardsList = document.querySelectorAll('[data-board-list]');
    const boardsMap = document.querySelectorAll('[data-board-map]');
    const boardsDescContainer = document.querySelector('.map-descs');
    const mapDescs = document.querySelectorAll('.map-desc');
    let activeBalloon = null;

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

      mainMap.geoObjects.add(newPlacemark);

      newPlacemark.events.add('click', () => {
        mainMap.geoObjects.each((geoObject) =>
          geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg')
        );

        boardsDescContainer.classList.add('active');

        boardsMap.forEach((boardMap) => {
          const attr = boardMap.getAttribute('data-board-map');
          changeActiveClass(newPlacemark.properties.get('myDataAttr'), attr, boardMap);
        });

        boardsList.forEach((boardList) => {
          if (boardList.getAttribute('data-board-list') === newPlacemark.properties.get('myDataAttr')) {
            boardList.classList.add('active');
            const distance = boardList.offsetTop;
            scrollbar.getScrollElement().scrollTo({
              top: distance,
              behavior: 'smooth',
            });
          } else {
            boardList.classList.remove('active');
          }
        });

        animationMap([placemark.lalitude, placemark.longitude], mainMap);

        newPlacemark.options.set('iconImageHref', './img/icons/location-pin-active.svg');
      });

    });

    boardsList.forEach((boardItem) => {
      boardItem.addEventListener('click', () => {
        const attr = boardItem.getAttribute('data-board-list');
        boardsDescContainer.classList.add('active');

        if (window.innerWidth < 768) {
          const lists = document.querySelectorAll('.js-maps-list');
          const maps = document.querySelectorAll('.js-maps-maps');

          lists.forEach((list) => list.classList.add('hide'));
          maps.forEach((map) => map.classList.remove('hide'));
        }

        mapDescs.forEach((mapDesc) => changeActiveClass(mapDesc.getAttribute('data-board-map'), attr, mapDesc));
        boardsList.forEach((boardList) =>
          changeActiveClass(boardList.getAttribute('data-board-list'), attr, boardList)
        );

        mainMap.geoObjects.each((placemark) => {
          if (placemark.properties.get('myDataAttr') === attr) {
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
        });
      });
    });

    boardsMap.forEach((boardMap) => {
      boardMap.addEventListener('click', (event) => {
        // Если клик на кнопку закрытия
        if (event.target.parentNode.classList.contains('js-balloon-close')) {
          boardsDescContainer.classList.remove('active');
          mapDescs.forEach((desc) => desc.classList.remove('active'));
          mainMap.geoObjects.each((geoObject) =>
            geoObject.options.set('iconImageHref', './img/icons/location-pin-default.svg')
          );
          boardsList.forEach((board) => board.classList.remove('active'));
        }
      });
    });

    removeContent(mainMap);
  }
}

// Код для карты контактов
function initContacts() {
  if (document.querySelector('.contacts-map')) {
    const contactsMap = new ymaps.Map('map', {
      center: [PLACEMARK_CONTACT.lalitude, PLACEMARK_CONTACT.longitude],
      zoom: 15,
    });

    const contactsPlacemark = new ymaps.Placemark(
      [PLACEMARK_CONTACT.lalitude, PLACEMARK_CONTACT.longitude],
      {
        // balloonContent: createBalloon(PLACEMARK_CONTACT),
      },
      {
        hideIconOnBalloonOpen: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/location-pin-active.svg',
        icon_imagesize: [62, 62],
        iconImageOffset: [-20, -30],
      }
    );

    contactsMap.geoObjects.add(contactsPlacemark);
    // contactsPlacemark.balloon.open();

    removeContent(contactsMap);
  }
}

// Код для карты карточки пансионата
function initBoard() {
  if (document.querySelector('.board-map')) {
    const boardMap = new ymaps.Map('map', {
      center:
        window.innerWidth < 768
          ? [PLACEMARK_BOARD.lalitude - 0.003, PLACEMARK_BOARD.longitude]
          : [PLACEMARK_BOARD.lalitude, PLACEMARK_BOARD.longitude],
      zoom: 15,
    });

    const boardPlacemark = new ymaps.Placemark(
      [PLACEMARK_BOARD.lalitude, PLACEMARK_BOARD.longitude],
      {
        balloonContent: createBalloon(PLACEMARK_BOARD),
      },
      {
        hideIconOnBalloonOpen: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/location-pin-active.svg',
        icon_imagesize: [62, 62],
        iconImageOffset: [-20, -30],
      }
    );

    boardMap.geoObjects.add(boardPlacemark);

    if (window.innerWidth > 1330) {
      boardPlacemark.balloon.open();
    }

    removeContent(boardMap);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ymaps.ready(initContacts);
  ymaps.ready(init);
  ymaps.ready(initBoard);
});

// Закрыть балун по клику на крестик в описании
document.addEventListener('DOMContentLoaded', function () {
  const closeButtons = document.querySelectorAll('.btn-close-desc');

  closeButtons.forEach(function (closeButton) {
    closeButton.addEventListener('click', function () {

      let mapDesc = closeButton.closest('.map-desc');
      if (mapDesc) {
        mapDesc.classList.contains('active') ? mapDesc.classList.remove('active') : mapDesc.classList.add('active');

      }
      let attr = mapDesc.getAttribute('data-board-map');
      let mapBalloon = document.querySelector('.map__balloon[data-board-map="' + attr + '"]');
      let mapBalloonYmaps = mapBalloon.parentElement.parentElement.parentElement;
      if (mapBalloon) {
        mapBalloonYmaps.style.display = 'none';
      }
    });
  });
});