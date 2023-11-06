function initRanger() {
  const rangeSlider = document.getElementById('range-slider');

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [0, 10000],
      connect: true,
      step: 100,
      margin: 500,
      range: {
        min: [0],
        max: [10000],
      },
    });

    const inputMin = document.getElementById('range__input-min');
    const inputMax = document.getElementById('range__input-max');
    const inputs = [inputMin, inputMax];

    rangeSlider.noUiSlider.on('update', (values, handle) => {
      inputs[handle].value = Math.round(values[handle]);
    });

    const setRangeSlider = (i, value) => {
      const arr = [null, null];
      arr[i] = value;

      rangeSlider.noUiSlider.set(arr);
    };

    inputs.forEach((el, index) => {
      el.addEventListener('change', (e) => {
        setRangeSlider(index, e.currentTarget.value);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initRanger();
});
