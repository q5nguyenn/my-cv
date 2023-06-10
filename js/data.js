import { setItem, getItem } from './ultility.js';

var user_reset = {
  name: 'Nguyễn Văn Quý',
  email: 'q5nguyenn@gmail.com',
  phone: '0986295956',
  gender: 'Nam',
  birth: '26/02/1993',
  address: 'Thái Hoà, Thái Thuỵ, Thái Bình',
  target: 'Mục tiêu của tôi là mục tiêu của tôi.',
};

var topic_reset = [
  { id: 1, title: 'Học vấn' },
  { id: 2, title: 'Kinh nghiệm' },
  { id: 3, title: 'Hoạt động' },
  { id: 4, title: 'Chứng chỉ' },
  { id: 5, title: 'Dannh hiệu và giải thưởng' },
  { id: 6, title: 'Các kỹ năng' },
  { id: 7, title: 'Sở thích' },
];

var topic_child_reset = [
  {
    topic_id: 1,
    topic_title01: 'Học viện kỹ thuật Quân sự',
    topic_title02: 'Học viên',
    topic_desc: 'Học viên lớp Công trình Quốc phòng',
  },
];

var like_reset = 99;

var user = localStorage.getItem('user');
var like = localStorage.getItem('like');

if (user == null) {
  setItem('user', user_reset);
}

if (like == null) {
  setItem('like', like_reset);
}
