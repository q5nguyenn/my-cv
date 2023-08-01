import { getItem, setItem, generateNewId, formatDate, preserveScrollOnReload } from './ultility.js';

$(document).ready(function () {
  showTopics();
  showInfo();
  preserveScrollOnReload();

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
  $('.page-right').on('click', '.topic-edit', function () {
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
    }
    $('.popup-backdrop').fadeIn(300);
    $('.handle-topic').animate(
      {
        top: '200px',
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
    parent_id = $(this).data('id');
    handle = 'add';
    showFormHandleTopicChild();
  });
  //2.2 Sửa topic
  //2.2.1 Show popup
  $('.page-right').on('click', '.topic-child-edit', function () {
    handle = 'edit';
    id = $(this).data('id');
    parent_id = $(this).data('parent');
    showFormHandleTopicChild(id, handle, parent_id);
  });

  //2.2.1 Xử lý
  $('#handle-topic-child').submit(function (e) {
    // e.preventDefault();
    handleTopicChild(id, handle, parent_id);
  });

  //2.3 Xoá topic
  $('.page-right').on('click', '.topic-child-delete', function (e) {
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
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
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
    $('#company').focus();
    if (id != 0) {
      let topic_childs = getItem('topic_childs');
      console.log(topic_childs);
      let topic_child = topic_childs.find((item) => item.id == id);
      $('#company').val(topic_child['company']);
      $('#role').val(topic_child['role']);
      $('#description').val(topic_child['description']);
      $('#from').val(topic_child['from']);
      $('#to').val(topic_child['to']);
    }
    $('.popup-backdrop').fadeIn(300);
    $('.handle-topic-child').animate(
      {
        top: '200px',
      },
      300
    );
  }
  //
  function showTopics() {
    let topics = getItem('topics');
    let childs = getItem('topic_childs');
    let htmlResult = '';
    topics.forEach((topic) => {
      let htmlChild = '';
      childs.forEach((child) => {
        if (topic['id'] == child['parent_id']) {
          let from = formatDate(child['from']);
          let to = formatDate(child['to']);
          htmlChild += `<div class="topic-child">
					<div class="topic-child-title"><span>${child['company']}</span> <span>, ${child['role']}</span></div>
					<div class="topic-child-time"><span>${from}</span> - <span>${to}</span></div>
					<div class="topic-child-desc">${child['description']}</div>
					<div class="toppic-menu">
					<div class="item-icon-simple icon-green topic-child-edit" style="cursor: pointer"
					data-id="${child['id']}" data-parent="${child['parent_id']}" >
						<i class="bi bi-pencil"></i>
						</div>
						<div class="item-icon-simple icon-red topic-child-delete" style="cursor: pointer"
						data-id="${child['id']}">
						<i class="bi bi-x-lg"></i>
						</div>
						</div>
						</div>`;
        }
      });
      htmlResult += `<div class="topic">
												<div class="topic-top">
													<div class="topic-title">${topic['title']}</div>
												</div>
												${htmlChild}
												<div class="toppic-menu">
													<div class="item-icon-simple topic-child-add" style="cursor: pointer" 
													data-id="${topic['id']}">
														<i class="bi bi-plus-lg"></i>
													</div>
													<div class="item-icon-simple icon-green topic-edit" style="cursor: pointer" 
													data-id="${topic['id']}">
														<i class="bi bi-pencil"></i>
													</div>
													<div class="item-icon-simple icon-red topic-delete" style="cursor: pointer" 
													data-id="${topic['id']}">
														<i class="bi bi-x-lg"></i>
													</div>
												</div>
											</div>`;
    });
    $('.page-right').html(htmlResult);
  }

  // User
  //3.1 Sửa topic
  //3.1.1 Show popup
  $('.edit-content').click(function (e) {
    let user = getItem('user');
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
    let name = $('#name').val();
    let email = $('#email').val();
    let phone_number = $('#phone_number').val();
    let gender = $('#gender').val();
    let birthday = $('#birthday').val();
    let address = $('#address').val();
    let target = $('#target').val();
    let user = {
      name: name,
      email: email,
      phone_number: phone_number,
      gender: gender,
      birthday: birthday,
      address: address,
      target: target,
    };
    setItem('user', user);
    showInfo();
  });

  function showInfo() {
    let user = getItem('user');
    $('#name-show').html(user['name']);
    $('#email-show').html(user['email']);
    $('#phone_number-show').html(user['phone_number']);
    $('#gender-show').html(user['gender']);
    $('#birthday-show').html(user['birthday']);
    $('#address-show').html(user['address']);
    $('#target-show').html(user['target']);
  }
});
