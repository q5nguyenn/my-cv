export { setItem, getItem, generateNewId, formatDate, pageReload, debounce, replace, replaceChild };

function setItem(item, value) {
  localStorage.setItem(item, JSON.stringify(value));
}

function getItem(item) {
  return JSON.parse(localStorage.getItem(item));
}

function generateNewId(arr) {
  let newId = 1;
  while (arr.find((item) => item.id === newId)) {
    newId++;
  }
  return newId;
}

function formatDate(dateString, format = 'simple') {
  if (!dateString) {
    return false;
  }
  let [year, month, day] = dateString.split('-');
  if (format == 'simple') {
    let formattedDate = `${month}/${year}`;
    return formattedDate;
  } else {
    let formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}

function pageReload() {
  const scrollPosition = localStorage.getItem('scrollPosition');

  if (scrollPosition) {
    $(window).scrollTop(parseInt(scrollPosition));
  }

  $(window).scroll(function () {
    const currentScroll = $(this).scrollTop();
    localStorage.setItem('scrollPosition', currentScroll);
  });
}

// Debounce
function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Func đổi vị trí
function replace(array, index, position = 'up') {
  const temp = array[index];
  if (position == 'up') {
    array[index] = array[index - 1];
    array[index - 1] = temp;
  } else {
    array[index] = array[index + 1];
    array[index + 1] = temp;
  }
  return array;
}

function replaceChild(array, index, position = 'up') {
  let temp = array[index];
  let childReplace = null;
  let arrayChild = [];
  array.forEach((element) => {
    if (element.parent_id == temp.parent_id) {
      arrayChild.push(element);
    }
  });
  let indexInArrayChild = arrayChild.findIndex((e) => e.id == temp.id);
  if (position == 'up') {
    childReplace = arrayChild[indexInArrayChild - 1];
  } else {
    childReplace = arrayChild[indexInArrayChild + 1];
  }
  let replaceIndex = array.findIndex((e) => e.id == childReplace.id);
  array[index] = array[replaceIndex];
  array[replaceIndex] = temp;
  return array;
}
