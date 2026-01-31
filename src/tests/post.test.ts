import request from 'supertest';
import { initApp } from '..';
import mongoose from 'mongoose';
import { post } from '../model/postModel';
import { user } from '../model/userModel';
import { Express } from 'express';
import { postMock, userMock } from './testMocks';

let app: Express;
let accessToken: string;
let userId: string;

beforeAll(async () => {
  app = await initApp();
  await post.deleteMany();
  await user.deleteMany();

  const userRes = await request(app).post('/auth/register').send(userMock);
  accessToken = userRes.body.tokens.token;
  const savedUser = await user.findOne({ email: userMock.email });
  userId = savedUser!._id.toString();

  postMock.forEach((post) => (post.sender = userId));
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Posts API', () => {
  test('Get posts empty', async () => {
    const res = await request(app).get('/post');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('Create post', async () => {
    const res = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[0]);

    expect(res.statusCode).toBe(201);
    expect(res.body.description).toBe(postMock[0].description);
    expect(res.body.sender).toBe(userId);
  });

  test('Create post with server error', async () => {
    const dbSpy = jest
      .spyOn(post, 'create')
      .mockRejectedValueOnce(new Error('Database Error'));

    const res = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[0]);

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeDefined();

    dbSpy.mockRestore();
  });

  test('Get all posts', async () => {
    const res = await request(app).get('/post');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  test('Get all posts with server error', async () => {
    const dbSpy = jest
      .spyOn(post, 'find')
      .mockRejectedValueOnce(new Error('Database Error'));
    const res = await request(app).get('/post');

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeDefined();
    dbSpy.mockRestore();
  });

  test('Get post by ID', async () => {
    const createRes = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[1]);

    const postId = createRes.body._id;

    const res = await request(app).get('/post/' + postId);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(postId);
  });

  test('Get non existing post by ID', async () => {
    const res = await request(app).get('/post/' + '6977c95fd0c43ba5be159849');
    expect(res.statusCode).toBe(404);
  });

  test('Get post by sender', async () => {
    const res = await request(app).get('/post?sender=' + userId);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Update post', async () => {
    const createRes = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[0]);

    const postId = createRes.body._id;

    const res = await request(app)
      .put('/post/' + postId)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ description: 'Updated' });

    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe('Updated');
  });

  test('Update post with server error', async () => {
    const createRes = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[0]);

    const postId = createRes.body._id;
    const dbSpy = jest
      .spyOn(post, 'findByIdAndUpdate')
      .mockRejectedValueOnce(new Error('Database Error'));

    const res = await request(app)
      .put('/post/' + postId)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ description: 'Updated' });

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBeDefined();

    dbSpy.mockRestore();
  });

  test('Delete post', async () => {
    const createRes = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(postMock[1]);
    const postId = createRes.body._id;
    const res = await request(app)
      .delete('/post/' + postId)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.statusCode).toBe(200);

    const getRes = await request(app).get('/post/' + postId);
    expect(getRes.statusCode).toBe(404);
  });
});
