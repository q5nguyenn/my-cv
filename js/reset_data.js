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
    id: 1,
    company: 'Học viện kỹ thuật Quân sự',
    role: 'Học viên',
    department: 'Học viên lớp Công trình Quốc phòng',
    start: '30/08/2011',
    end: '31/12/2016',
    parent_id: 1,
  },
];

var like_reset = 99;

var user = localStorage.getItem('user');
var like = localStorage.getItem('like');
var topic = localStorage.getItem('topic');
var topic_child = localStorage.getItem('topic_child');

if (user == null) {
  setItem('user', user_reset);
}

if (like == null) {
  setItem('like', like_reset);
}

if (topic == null) {
  setItem('topic', topic_reset);
}

if (topic_child == null) {
  setItem('topic_child', topic_child_reset);
}
