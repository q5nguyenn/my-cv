export { setItem, getItem, generateNewId, formatDate, preserveScrollOnReload };

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

function formatDate(dateString) {
  if (!dateString) {
    return '02/1998';
  }
  let [year, month, day] = dateString.split('-');
  let formattedDate = `${month}/${year}`;
  return formattedDate;
}

function preserveScrollOnReload() {
  const scrollPosition = localStorage.getItem('scrollPosition');

  if (scrollPosition) {
    $(window).scrollTop(parseInt(scrollPosition));
  }

  $(window).scroll(function () {
    const currentScroll = $(this).scrollTop();
    localStorage.setItem('scrollPosition', currentScroll);
  });
}
