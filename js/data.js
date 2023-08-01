import { setItem, getItem } from './ultility.js';

var user_reset = {
  name: 'Nguyễn Văn Quý',
  email: 'q5nguyenn@gmail.com',
  phone_number: '0986295956',
  gender: 'Nam',
  birthday: '26/02/1993',
  address: 'Thái Hoà, Thái Thuỵ, Thái Bình',
  target: 'Mục tiêu của tôi là mục tiêu của tôi.',
};

var topics_reset = [
  { id: 1, title: 'Học vấn' },
  { id: 2, title: 'Kinh nghiệm' },
  { id: 3, title: 'Hoạt động' },
  { id: 4, title: 'Chứng chỉ' },
  { id: 5, title: 'Dannh hiệu và giải thưởng' },
  { id: 6, title: 'Các kỹ năng' },
  { id: 7, title: 'Sở thích' },
];

var topic_childs_reset = [
  {
    id: 1,
    company: 'Học viện kỹ thuật Quân sự',
    role: 'Học viên',
    description: 'Học viên lớp Công trình Quốc phòng',
    from: '2011-08-30',
    to: '2016-12-31',
    parent_id: 1,
  },
];

var likes_reset = 99;

var user = getItem('user');
var likes = getItem('likes');
var topics = getItem('topics');
var topic_childs = getItem('topic_childs');

if (user == null) {
  setItem('user', user_reset);
}

if (likes == null) {
  setItem('likes', likes_reset);
}

if (topics == null) {
  setItem('topics', topics_reset);
}

if (topic_childs == null) {
  setItem('topic_childs', topic_childs_reset);
}
