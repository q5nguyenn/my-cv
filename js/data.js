import { setItem, getItem } from './utility.js';
export { user_reset, likes_reset, topics_reset, topic_childs_reset, colors_reset };

const user_reset = {
  name: 'Nguyễn Văn Quý',
  avatar: './images/Quy.jpg',
  email: 'q5nguyenn@gmail.com',
  phone_number: '0986295956',
  gender: 'Nam',
  birthday: '1993-02-26',
  address: 'Thái Hoà, Thái Thuỵ, Thái Bình',
  target:
    'Với  kiến thức tích luỹ, tôi đang tìm kiếm cơ hội để tham gia vào môi trường làm việc chuyên nghiệp trong ngành IT.</br>Mục tiêu của tôi là không ngừng học hỏi, phát triển kỹ năng. Tôi muốn được tham gia, áp dụng kiến thức, kỹ năng của mình để thực hiện những dự án có thể mang lại giá trị thực sự cho công ty.',
};

const colors_reset = {
  primary: '#d9cab8',
  secondary: '#f0e7df',
};

const topics_reset = [
  {
    id: 1,
    title: 'Học vấn',
  },
  {
    id: 2,
    title: 'Kinh nghiệm',
  },
  {
    id: 3,
    title: 'Chứng chỉ',
  },
  {
    id: 4,
    title: 'Các kỹ năng',
  },
  {
    id: 5,
    title: 'Sở thích',
  },
];

// const topics_reset = [
//   { id: 1, title: 'Học vấn' },
//   { id: 2, title: 'Kinh nghiệm' },
//   { id: 3, title: 'Hoạt động' },
//   { id: 4, title: 'Chứng chỉ' },
//   { id: 5, title: 'Dannh hiệu và giải thưởng' },
//   { id: 6, title: 'Các kỹ năng' },
//   { id: 7, title: 'Sở thích' },
// ];

const topic_childs_reset = [
  {
    id: 1,
    company: 'Học viện kỹ thuật Quân sự',
    role: 'Học viên',
    description: 'Học viên lớp Công trình',
    from: '2011-08-30',
    to: '2016-12-31',
    parent_id: 1,
  },
  {
    id: 2,
    company: 'FPT Aptech',
    role: 'Sinh viên',
    description: 'Tại lớp T2205E1, T2207E',
    from: '2022-06-09',
    to: '2023-08-09',
    parent_id: 1,
  },
  {
    id: 3,
    company: 'HTML, CSS',
    role: '',
    description: 'HTML, CSS, Boostrap',
    from: '2022-06-01',
    to: '2023-01-01',
    parent_id: 4,
  },
  {
    id: 4,
    company: 'Nghe nhạc',
    role: '',
    description: 'Thời gian rảnh rỗi tôi thường nghe nhạc, nó giúp tôi thư giãn.',
    from: '',
    to: '',
    parent_id: 5,
  },
  {
    id: 5,
    company: 'Về quê',
    role: '',
    description: 'Khi có cơ hội, tôi thường về quê để tận hưởng không gian trong lành và gặp gỡ gia đình.',
    from: '',
    to: '',
    parent_id: 5,
  },
  {
    id: 7,
    company: 'JavaScript',
    role: '',
    description: 'JavaScript thuần, Jquery, Angular JS',
    from: '2022-06-01',
    to: '2023-01-01',
    parent_id: 4,
  },
  {
    id: 8,
    company: 'ADSE (Advanced Diploma in Software Engineering)',
    role: '',
    description: 'Đã học được 2/4 kì tại FPT Aptech',
    from: '2022-01-06',
    to: '2024-01-06',
    parent_id: 3,
  },
  {
    id: 9,
    company: 'Database Management',
    role: '',
    description: 'SQL Serve, My SQL',
    from: '2022-06-01',
    to: '2023-01-01',
    parent_id: 4,
  },
  {
    id: 10,
    company: 'Java',
    role: '',
    description: 'Java core, Java nâng cao',
    from: '2023-01-01',
    to: '2023-07-01',
    parent_id: 4,
  },
  {
    id: 11,
    company: 'C#',
    role: '',
    description: 'C# cơ bản',
    from: '2023-01-01',
    to: '2023-07-01',
    parent_id: 4,
  },
  {
    id: 12,
    company: 'PHP',
    role: '',
    description: 'PHP thuần, Laravel',
    from: '2023-01-01',
    to: '2023-07-01',
    parent_id: 4,
  },
];

const likes_reset = 99;

var user = getItem('user');
var likes = getItem('likes');
var topics = getItem('topics');
var topic_childs = getItem('topic_childs');
var colors = getItem('colors');

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

if (colors == null) {
  setItem('colors', colors_reset);
}
