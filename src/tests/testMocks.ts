export const userMock = {
  username: 'testuser2',
  email: 'test2@test.com',
  password: 'password123',
  profilePicture: 'pic.jpg',
};

export const postMock = [
  {
    sender: '12345',
    description: 'Test Post 1',
    imageUrl: 'http://test.com/img1.jpg',
    date: new Date(),
  },
  {
    sender: '12345',
    description: 'Test Post 2',
    imageUrl: 'http://test.com/img2.jpg',
    date: new Date(),
  },
];

export const commentMock = [
  {
    sender: 'aaaa',
    postId: '1234',
    content: 'this post is great',
    date: new Date(),
  },
  {
    sender: 'bbbb',
    postId: '5678',
    content: 'this post is excellent',
    date: new Date(),
  },
  {
    sender: 'cccc',
    postId: '1234',
    content: 'this post is good',
    date: new Date(),
  },
  {
    sender: 'dddd',
    postId: '11111',
    content: 'this post is fine',
    date: new Date(),
  },
  {
    sender: 'eeee',
    postId: '222',
    content: 'Nice post',
    date: new Date(),
  },
  {
    sender: 'ffff',
    postId: '333',
    content: 'Excellent post',
    date: new Date(),
  },
];

export const authMock = {
  username: 'authuser',
  email: 'auth@test.com',
  password: 'password123',
  profilePicture: 'pic.jpg',
  _id: '',
  token: '',
  refreshToken: '',
};
