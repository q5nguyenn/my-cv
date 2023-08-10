import { getItem, setItem, generateNewId, formatDate, pageReload, debounce, replace, replaceChild } from './utility.js';
import { user_reset, likes_reset, topics_reset, topic_childs_reset, colors_reset } from './data.js';

$(document).ready(function () {
  showTopics();
  showInfo();
  setColor();
  pageReload();

  $('.popup-backdrop').click(function (e) {
    if ($(e.target).hasClass('popup-backdrop')) {
      $('.popup-backdrop').fadeOut(300);
      $('.edit-info').animate(
        {
          left: '-1000px',
        },
        300
      );
    }
  });

  //Exit
  $('.icon-exit').click(function (e) {
    e.preventDefault();
    hidePopup();
  });
  $('.icon-exit').hover(
    function (e) {
      $(this).css('transform', 'rotate(90deg)');
    },
    function () {
      $(this).css('transform', 'rotate(0deg)');
    }
  );
  $('.popup-backdrop').click(function (e) {
    if ($(e.target).hasClass('popup-backdrop')) {
      hidePopup();
    }
  });

  function hidePopup() {
    $('.popup-backdrop').fadeOut(300);
    $('.edit-info').animate(
      {
        left: '-1000px',
      },
      300
    );
    $('.handle-topic').animate(
      {
        top: '-1000px',
      },
      300
    );
    $('.handle-topic-child').animate(
      {
        top: '-1000px',
      },
      300
    );
  }

  // CRUD dữ liệu
  //1 Topic
  //1.1 Thêm topic
  //1.1.1 Show Popuup
  let handle = 'add';
  let id = 0;
  $('#add-topic').click(function (e) {
    handle = 'add';
    showFormHandleTopic();
  });

  // 1.1.2 Xử lý chung với sửa
  //1.2 Sửa topic
  //1.2.1 Show popup
  $('.page-right').on('click', '.topic-top', function (e) {
    e.stopPropagation();
    handle = 'edit';
    id = $(this).data('id');
    showFormHandleTopic(id);
  });

  //1.2.1 Xử lý
  $('#handle-topic').submit(function (e) {
    handleTopic(id, handle);
  });

  //1.3 Xoá topic
  $('.page-right').on('click', '.topic-delete', function (e) {
    e.stopPropagation();
    handle = 'delete';
    id = $(this).data('id');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleTopic(id, handle);
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        location.reload();
      }
    });
  });
  //1.4 Các hàm dùng chung Topic
  function handleTopic(id = 0, handle = 'add') {
    // param = 1 => thêm; param = 0 => sửa; param = -1 => xoá
    let topics = getItem('topics');
    if (handle == 'add') {
      // Thêm
      let id = generateNewId(topics);
      let title = $('#title').val();
      let topic = {
        id: id,
        title: title,
      };
      topics.push(topic);
    } else if (handle == 'edit') {
      let index = topics.findIndex((item) => item.id == id);
      let title = $('#title').val();
      let new_topic = {
        id: id,
        title: title,
      };
      topics[index] = new_topic;
    } else {
      topics = topics.filter((item) => item.id != id);
    }
    setItem('topics', topics);
    $('#title').val('');
    showTopics();
  }
  function showFormHandleTopic(id = 0) {
    $('#title').focus();
    if (id != 0) {
      let topics = getItem('topics');
      let topic = topics.find((item) => item.id == id);
      $('#title').val(topic['title']);
    } else {
      $('#title').val('');
    }
    $('.popup-backdrop').fadeIn(300);
    $('.handle-topic').animate(
      {
        top: '50px',
      },
      300
    );
  }
  // Hết Topic
  //2. Topic child
  //2.1 Thêm topic
  //2.1.1 Show Popuup
  let parent_id = 0;
  $('.page-right').on('click', '.topic-child-add', function (e) {
    e.preventDefault();
    e.stopPropagation();
    parent_id = $(this).data('id');
    handle = 'add';
    showFormHandleTopicChild(0);
  });
  //2.2 Sửa topic
  //2.2.1 Show popup
  $('.page-right').on('click', '.topic-child', function () {
    handle = 'edit';
    id = $(this).data('id');
    parent_id = $(this).data('parent');
    showFormHandleTopicChild(id);
  });

  //2.2.1 Xử lý
  $('#handle-topic-child').submit(function (e) {
    // e.preventDefault();
    handleTopicChild(id, handle, parent_id);
  });

  //2.3 Xoá topic-child
  $('.page-right').on('click', '.topic-child-delete', function (e) {
    e.stopPropagation();
    handle = 'delete';
    id = $(this).data('id');
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleTopicChild(id, handle);
        // Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        location.reload();
      }
    });
  });
  // 2.4 Dùng chung
  function handleTopicChild(id = 0, handle = 'add', parent_id = 0) {
    // param = 1 => thêm; param = 0 => sửa; param = -1 => xoá
    let topic_childs = getItem('topic_childs');
    if (handle == 'add') {
      // Thêm
      let id = generateNewId(topic_childs);
      let company = $('#company').val();
      let role = $('#role').val();
      let description = $('#description').val();
      let from = $('#from').val();
      let to = $('#to').val();
      let topic_child = {
        id: id,
        company: company,
        role: role,
        description: description,
        from: from,
        to: to,
        parent_id: parent_id,
      };
      topic_childs.push(topic_child);
    } else if (handle == 'edit') {
      let index = topic_childs.findIndex((item) => item.id == id);
      let company = $('#company').val();
      let role = $('#role').val();
      let description = $('#description').val();
      let from = $('#from').val();
      let to = $('#to').val();
      let new_topic_child = {
        id: id,
        company: company,
        role: role,
        description: description,
        from: from,
        to: to,
        parent_id: parent_id,
      };
      topic_childs[index] = new_topic_child;
    } else {
      topic_childs = topic_childs.filter((item) => item.id != id);
    }
    setItem('topic_childs', topic_childs);
    $('input').val('');
    showTopics();
  }

  function showFormHandleTopicChild(id = 0) {
    if (id != 0) {
      let topic_childs = getItem('topic_childs');
      let topic_child = topic_childs.find((item) => item.id == id);
      $('#company').val(topic_child['company']);
      $('#role').val(topic_child['role']);
      $('#description').val(topic_child['description']);
      $('#from').val(topic_child['from']);
      $('#to').val(topic_child['to']);
    } else {
      $('#company').val('');
      $('#role').val('');
      $('#description').val('');
      $('#from').val('');
      $('#to').val('');
    }
    $('#company').focus();
    $('.popup-backdrop').fadeIn(300);
    $('.handle-topic-child').animate(
      {
        top: '50px',
      },
      300
    );
  }
  //
  function showTopics() {
    let topics = getItem('topics');
    let length = topics.length;
    let childs = getItem('topic_childs');
    let htmlResult = '';
    topics.forEach((topic, i) => {
      let htmlChild = '';
      let upDownMenu = '';
      let topicChilds = [];
      if (i == 0 && i == length - 1) {
        upDownMenu = '';
      } else if (i == 0) {
        upDownMenu = `<div class="item-icon-simple icon-green topic-down" style="cursor: pointer" 
												data-id="${topic['id']}" >
												<i class="bi bi-arrow-down"></i>
											</div>`;
      } else if (i == length - 1) {
        upDownMenu = `<div class="item-icon-simple icon-green topic-up" style="cursor: pointer" 
												data-id="${topic['id']}" >
												<i class="bi bi-arrow-up"></i>
											</div>`;
      } else {
        upDownMenu = `<div class="item-icon-simple icon-green topic-up" style="cursor: pointer" 
												data-id="${topic['id']}" >
												<i class="bi bi-arrow-up"></i>
												</div>
												<div class="item-icon-simple icon-green topic-down" style="cursor: pointer" 
												data-id="${topic['id']}" >
												<i class="bi bi-arrow-down"></i>
											</div>`;
      }
      childs.forEach((child) => {
        if (topic['id'] == child['parent_id']) {
          topicChilds.push(child);
        }
      });
      let childLength = topicChilds.length;
      topicChilds.forEach((child, j) => {
        let upDownMenuChild = '';
        if (j == 0 && j == childLength - 1) {
          upDownMenuChild = '';
        } else if (j == 0) {
          upDownMenuChild = `<div class="item-icon-simple topic-child-down" style="cursor: pointer"
														data-id="${child['id']}" data-parent="${child['parent_id']}">
														<i class="bi bi-arrow-down"></i>
													</div>`;
        } else if (j == childLength - 1) {
          upDownMenuChild = `<div class="item-icon-simple topic-child-up" style="cursor: pointer"
														data-id="${child['id']}" data-parent="${child['parent_id']}">
														<i class="bi bi-arrow-up"></i>
													</div>`;
        } else {
          upDownMenuChild = `<div class="item-icon-simple topic-child-up" style="cursor: pointer"
														data-id="${child['id']}" data-parent="${child['parent_id']}">
														<i class="bi bi-arrow-up"></i>
														</div>
														<div class="item-icon-simple topic-child-down" style="cursor: pointer"
														data-id="${child['id']}" data-parent="${child['parent_id']}">
														<i class="bi bi-arrow-down"></i>
													</div>`;
        }
        let from = formatDate(child['from']);
        let to = formatDate(child['to']);
        let comma = child['role'] ? ',' : '';
        let dateTime = '';
        if (!from && !to) {
          dateTime = '';
        } else {
          dateTime = `<span>${from}</span> - <span>${to}</span>`;
        }
        htmlChild += `<div class="topic-child" data-id="${child['id']}" data-parent="${child['parent_id']}" >
					<div class="topic-child-title"><span>${child['company']}</span> <span>${comma} ${child['role']}</span></div>
					<div class="topic-child-time">${dateTime}</div>
					<div class="topic-child-desc">${child['description']}</div>
					<div class="topic-menu" style="display:none">
						<div class="item-icon-simple icon-green topic-child-edit" style="cursor: pointer"
						data-id="${child['id']}" data-parent="${child['parent_id']}" hidden>
						<i class="bi bi-pencil"></i>
						</div>
						${upDownMenuChild}
						<div class="item-icon-simple icon-red topic-child-delete" style="cursor: pointer"
						data-id="${child['id']}">
						<i class="bi bi-x-lg"></i>
						</div>
						</div>
					</div>`;
      });
      htmlResult += `<div class="topic">
												<div class="topic-top" data-id="${topic['id']}">
													<div class="topic-title">${topic['title']}</div>
													<div class="topic-menu" style="display:none">
													<div class="item-icon-simple topic-child-add" style="cursor: pointer" 
													data-id="${topic['id']}">
														<i class="bi bi-plus-lg"></i>
													</div>
													<div class="item-icon-simple icon-green topic-edit" style="cursor: pointer" 
													data-id="${topic['id']}" hidden>
														<i class="bi bi-pencil"></i>
													</div>
													${upDownMenu}
													<div class="item-icon-simple icon-red topic-delete" style="cursor: pointer" 
													data-id="${topic['id']}">
														<i class="bi bi-x-lg"></i>
													</div>
												</div>
												</div>
												${htmlChild}
											</div>`;
    });
    $('.page-right').html(htmlResult);
  }

  // User
  //3.1 Sửa topic
  //3.1.1 Show popup
  $('.edit-content').click(function (e) {
    let user = getItem('user');
    $('#name').focus();
    $('#name').val(user['name']);
    $('#email').val(user['email']);
    $('#phone_number').val(user['phone_number']);
    $('#gender').val(user['gender']);
    $('#birthday').val(user['birthday']);
    $('#address').val(user['address']);
    $('#target').val(user['target']);
    $('.popup-backdrop').fadeIn(300);
    $('.edit-info').animate(
      {
        left: '0px',
      },
      300
    );
  });

  //3.1.2
  $('#form-info').submit(function (e) {
    let user = getItem('user');
    let name = $('#name').val();
    let email = $('#email').val();
    let phone_number = $('#phone_number').val();
    let gender = $('#gender').val();
    let birthday = $('#birthday').val();
    let address = $('#address').val();
    let target = $('#target').val();
    let user_update = {
      name: name,
      avatar: user.avatar,
      email: email,
      phone_number: phone_number,
      gender: gender,
      birthday: birthday,
      address: address,
      target: target,
    };
    setItem('user', user_update);
    showInfo();
  });

  function showInfo() {
    let user = getItem('user');
    let birthday = formatDate(user['birthday'], 'full');
    $('#name-show').html(user['name']);
    $('#email-show').html(user['email']);
    $('#phone_number-show').html(user['phone_number']);
    $('#gender-show').html(user['gender']);
    $('#birthday-show').html(birthday);
    $('#address-show').html(user['address']);
    $('#target-show').html(user['target']);
    $('#imgPreview').attr('src', user['avatar']);
    let likes = getItem('likes');
    $('.like-count').html(likes);
  }

  // Reset data
  $('.reset').click(function (e) {
    e.preventDefault();
    setItem('user', user_reset);
    setItem('likes', likes_reset);
    setItem('topics', topics_reset);
    setItem('topic_childs', topic_childs_reset);
    setItem('colors', colors_reset);
    location.reload();
  });
  //Like
  $('.like').click(function (e) {
    let likes = getItem('likes');
    likes++;
    setItem('likes', likes);
    $('.like-count').html(likes);
    // location.reload();
  });

  // Print
  $('.print').click(function (e) {
    var divContentBody = $('.page').html();
    var a = window.open('', '', 'height=500, width=500');
    a.document.write(
      `<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta http-equiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>My CV APP</title>
				<link rel="stylesheet" href="./css/style.css"/>
				<link rel="stylesheet" href="./css/print.css"/>
			</head>
			<body>`
    );
    a.document.write('<div class="page">');
    a.document.write(divContentBody);
    a.document.write('</div>');
    a.document.write('</body>');
    a.document.write('</html>');
    a.document.close();
    a.focus();

    setTimeout(function () {
      a.print();
    }, 1000);
    return true;
  });

  //Dowload
  $('.download').click(function (e) {
    const pdfURL = './images/my-cv.pdf';
    const link = $('<a>').attr('href', pdfURL).attr('download', 'my-cv.pdf');
    $('body').append(link);
    link[0].click();
    link.remove();
  });
  // Choosecolor
  function setColor() {
    let colors = getItem('colors');
    let primary_color = colors['primary'];
    let secondary_color = colors['secondary'];
    let blur_color = 'rgba(0, 0, 0, 0.4)';
    $('#primary-color').val(primary_color);
    $('#secondary-color').val(secondary_color);
    $('.primary-color').css('background-color', primary_color);
    $('.secondary-color').css('background-color', secondary_color);
    $('body').css('--bg-color1', primary_color);
    $('body').css('--bg-color2', secondary_color);
    $('body').css('--blur-color', blur_color);
  }

  $('#primary-color').change(function (e) {
    e.preventDefault();
    let colors = getItem('colors');
    colors['primary'] = $(this).val();
    setItem('colors', colors);
    setColor();
  });

  $('#secondary-color').change(function (e) {
    e.preventDefault();
    let colors = getItem('colors');
    colors['secondary'] = $(this).val();
    setItem('colors', colors);
    setColor();
  });

  //Change avatar
  $('#avatar-image').change(function () {
    const file = this.files[0];
    console.log(file);
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        let baseImage = event.target.result;
        let user = getItem('user');
        user['avatar'] = baseImage;
        setItem('user', user);
        $('#imgPreview').attr('src', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Ẩn hiện menu
  $('.topic-top').hover(
    debounce(function () {
      $(this).children('.topic-menu').show(300);
    }, 300),
    debounce(function () {
      $(this).children('.topic-menu').hide(300);
    }, 300)
  );

  $('.topic-child').hover(
    debounce(function () {
      $(this).find('.topic-menu').fadeIn(300);
    }, 300),
    debounce(function () {
      $(this).find('.topic-menu').fadeOut(300);
    }, 300)
  );

  // Đổi vị trí
  $('.page-right').on('click', '.topic-up', function (e) {
    e.stopPropagation();
    let topics = getItem('topics');
    let id = $(this).data('id');
    let index = topics.findIndex((item) => item.id == id);
    topics = replace(topics, index, 'up');
    setItem('topics', topics);
    location.reload();
  });

  $('.page-right').on('click', '.topic-down', function (e) {
    e.stopPropagation();
    let topics = getItem('topics');
    let id = $(this).data('id');
    let index = topics.findIndex((item) => item.id == id);
    topics = replace(topics, index, 'down');
    setItem('topics', topics);
    location.reload();
  });

  $('.page-right').on('click', '.topic-child-up', function (e) {
    e.stopPropagation();
    let topicChilds = getItem('topic_childs');
    let id = $(this).data('id');
    let index = topicChilds.findIndex((item) => item.id == id);
    topicChilds = replaceChild(topicChilds, index, 'up');
    setItem('topic_childs', topicChilds);
    location.reload();
  });

  $('.page-right').on('click', '.topic-child-down', function (e) {
    e.stopPropagation();
    let topicChilds = getItem('topic_childs');
    let id = $(this).data('id');
    let index = topicChilds.findIndex((item) => item.id == id);
    topicChilds = replaceChild(topicChilds, index, 'down');
    setItem('topic_childs', topicChilds);
    location.reload();
  });
});
