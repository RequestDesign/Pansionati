document.addEventListener('DOMContentLoaded', () => {
  const isSelectMult = (elem) => {
    if (elem.classList.contains('select-mult')) {
      return true;
    }
    return false;
  };

  const focusSearch = (search) => {
    if (search) {
      search.focus();
    }
  };

  const deleteValueSearch = (search) => {
    if ((search && search.closest('.select-tags')) || (search && search.classList.contains('select-tags'))) {
      return;
    }

    if ((search && search.closest('.numbers')) || (search && search.classList.contains('numbers'))) {
      return;
    }

    if (search) {
      search.value = '';
    }
  };

  const toggleShowEmptyMsg = (isFind, empty) => {
    if (isFind && empty) {
      empty.classList.remove('active');
    } else {
      empty.classList.add('active');
    }
  };

  const showAllItems = (items, empty) => {
    if (empty) {
      empty.classList.remove('active');
    }
    items.forEach((item) => {
      item.style.display = 'block';
    });
  };

  const selects = document.querySelectorAll('.js-select');

  if (selects) {
    selects.forEach((select) => {
      const inner = select.querySelector('.js-select-inner');
      const title = select.querySelector('.js-select-value');
      const items = select.querySelectorAll('.js-select-item');
      const labels = select.querySelectorAll('.js-select-item label');
      const search = select.querySelector('.js-select-search');
      const empty = select.querySelector('.js-select-empty');

      if (select.classList.contains('select-mult')) {
        const mainInput = select.querySelector('.js-select-search'),
          items = select.querySelectorAll('.js-select-item label');

        let valuesArray = [];

        items.forEach((item) => {
          item.addEventListener('click', () => {
            item.classList.toggle('active');

            item.classList.contains('active')
              ? (valuesArray = [...valuesArray, item.textContent.replaceAll(' ', '')])
              : (valuesArray = valuesArray.filter((value) => value !== item.textContent.replaceAll(' ', '')));

            mainInput.value = `${valuesArray.join(', ')}`;
          });
        });
      }

      inner.addEventListener('click', (event) => {
        if (event.target.closest('.js-select-search') && select.closest('.js-select.active')) {
          focusSearch(search);
        } else {
          deleteValueSearch(search);
        }

        if (select.classList.contains('active')) {
          select.classList.remove('active');
          showAllItems(items, empty);
        } else {
          selects.forEach((select) => {
            select.classList.contains('select-mult') && select.classList.remove('active');
          });

          select.classList.add('active');
          focusSearch(search);
        }
      });

      if (search) {
        search.addEventListener('input', () => {
          let isFind = false;
          const inputValue = search.value.toLowerCase().trim();
          items.forEach((item) => {
            const label = item.querySelector('label').textContent.toLowerCase().trim();
            if (label.indexOf(inputValue) === 0) {
              item.style.display = 'block';
              isFind = true;
            } else {
              item.style.display = 'none';
            }
            toggleShowEmptyMsg(isFind, empty);
          });
        });
      }

      for (let index = 0; index < labels.length; index += 1) {
        labels[index].addEventListener('click', (e) => {
          if (title) {
            title.textContent = e.target.textContent;

            if (document.querySelector('.select-sort') && window.innerWidth < 768) {
              document.querySelector('.select-sort .select__content').classList.remove('active');
            }

            if (document.querySelector('.catalog__header-bottom-txt')) {
              document.querySelector('.catalog__header-bottom-txt').innerHTML = title.textContent;
            }
          }
          if (!isSelectMult(select)) {
            select.classList.remove('active');
          }
        });
      }

      if (document.querySelector('.select-sort') && window.innerWidth < 768) {
        document.addEventListener('click', (event) => {
          if (event.target.closest('.select__content')) {
            document.querySelector('.select-sort .select__content').classList.remove('active');
            document.querySelector('.select-sort').classList.remove('active');
          }
        });
      }

      document.addEventListener('click', (event) => {
        if (!event.target.closest('.js-select')) {
          select.classList.remove('active');
          deleteValueSearch(search);
          showAllItems(items, empty);
        }
      });
    });
  }
});
