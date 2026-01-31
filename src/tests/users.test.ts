import request from 'supertest';
import mongoose from 'mongoose';
import { user } from '../model/userModel';
import { Express } from 'express';
import { userMock } from './testMocks';
import { initApp } from '..';

let app: Express;
let accessToken: string;
let userId: string;

beforeAll(async () => {
  app = await initApp();
  await user.deleteMany();

  const userRes = await request(app).post('/auth/register').send(userMock);
  accessToken = userRes.body.tokens.token;
  const savedUser = await user.findOne({ email: userMock.email });
  userId = savedUser!._id.toString();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Users API', () => {
  test('Create user', async () => {
    const newUser = {
      username: 'testuser3',
      email: 'test3@test.com',
      password: 'password123',
      profilePicture: 'pic.jpg',
    };

    const res = await request(app)
      .post('/user')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe(newUser.username);
  });

  test('Get user by ID', async () => {
    const res = await request(app).get('/user/' + userId);

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe(userMock.username);
    expect(res.body.password).not.toBe(userMock.password);
  });

  test('Update user', async () => {
    const res = await request(app)
      .put('/user/' + userId)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({ username: 'updatedUser' });

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe('updatedUser');
  });

  test('Delete user', async () => {
    const res = await request(app)
      .delete('/user/' + userId)
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.statusCode).toBe(200);

    const getRes = await request(app).get('/user/' + userId);
    expect(getRes.statusCode).toBe(404);
  });

  test('Delete user forbidden', async () => {
    const newUser = {
      username: 'testuser4',
      email: 'test4@test.com',
      password: 'password143',
      profilePicture: 'pic.jpg',
    };

    const createRes = await request(app)
      .post('/user')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(newUser);

    const res = await request(app)
      .delete('/user/' + createRes.body._id.toString())
      .set('Authorization', 'Bearer ' + accessToken);

    expect(res.statusCode).toBe(403);
  });
});
