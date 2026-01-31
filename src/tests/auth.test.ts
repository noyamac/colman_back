import request from 'supertest';
import { initApp } from '..';
import mongoose from 'mongoose';
import { user } from '../model/userModel';
import { Express } from 'express';
import { authMock } from './testMocks';

let app: Express;

beforeAll(async () => {
  app = await initApp();
  await user.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  test('Register new user', async () => {
    const res = await request(app).post('/auth/register').send(authMock);
    expect(res.statusCode).toBe(201);
    expect(res.body.tokens).toHaveProperty('token');
    expect(res.body.tokens).toHaveProperty('refreshToken');
    authMock.token = res.body.tokens.token;
    authMock.refreshToken = res.body.tokens.refreshToken;
  });

  test('Login user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: authMock.email,
      password: authMock.password,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.tokens).toHaveProperty('token');
    expect(res.body.tokens).toHaveProperty('refreshToken');
    authMock.token = res.body.tokens.token;
    authMock.refreshToken = res.body.tokens.refreshToken;
  });

  test('Refresh token', async () => {
    const res = await request(app).post('/auth/refresh-token').send({
      refreshToken: authMock.refreshToken,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('refreshToken');
    authMock.token = res.body.token;
    authMock.refreshToken = res.body.refreshToken;

    const newAccessResponse = await request(app)
      .post('/post')
      .set('Authorization', 'Bearer ' + authMock.token)
      .send({
        sender: '12345',
        description: 'Test Post 2',
        imageUrl: 'http://test.com/img2.jpg',
        date: new Date(),
      });

    expect(newAccessResponse.statusCode).toBe(201);
    expect(newAccessResponse.body).toHaveProperty('_id');
  });

  test('Logout', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Authorization', 'Bearer ' + authMock.refreshToken);

    expect(res.statusCode).toBe(200);

    const refreshRes = await request(app).post('/auth/refresh-token').send({
      refreshToken: authMock.refreshToken,
    });

    expect(refreshRes.statusCode).not.toBe(200);
  });
});
