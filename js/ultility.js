export { setItem, getItem };

function setItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

function getItem(item) {
  return JSON.parse(localStorage.getItem(item));
}
