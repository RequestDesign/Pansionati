export function scroolMapList(container, el) {
  const distance = el.offsetTop - container.offsetTop;

  container.scroll({
    top: distance,
    behavior: 'smooth',
  });
}
