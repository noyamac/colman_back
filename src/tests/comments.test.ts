import mongoose from 'mongoose';
import { comment } from '../model/commentModel';
import { user } from '../model/userModel';
import { initApp } from '..';
import request from 'supertest';
import { Express } from 'express';
import { commentMock, userMock } from './testMocks';

let accessToken: string;
let userId: string;
let app: Express;

beforeAll(async () => {
  app = await initApp();
  await comment.deleteMany();
  await user.deleteMany();

  const userRes = await request(app).post('/auth/register').send(userMock);

  accessToken = userRes.body.tokens.token;
  const savedUser = await user.findOne({ email: userMock.email });
  userId = savedUser!._id.toString();
  commentMock.forEach((comment) => {
    comment.sender = userId;
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe('Comments API', () => {
  test('Get comments empty db', async () => {
    const response = await request(app).get('/comment');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('Post a new comment', async () => {
    const response = await request(app)
      .post('/comment')
      .set('Authorization', 'Bearer ' + accessToken)
      .send(commentMock[0]);
    expect(response.statusCode).toBe(201);
    const { sender, ...expectedComment } = commentMock[0];
    expect(response.body).toMatchObject({
      ...expectedComment,
      date: commentMock[0].date.toISOString(),
    });
  });

  test('Post two comments', async () => {
    const response = await request(app)
      .post('/comment')
      .set('Authorization', 'Bearer ' + accessToken)
      .send([commentMock[1], commentMock[2]]);
    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(2);
  });

  test('Get comments after post', async () => {
    const response = await request(app).get('/comment');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test('Get comments by post id', async () => {
    const comment = commentMock[0];
    const response = await request(app).get(
      '/comment?postId=' + comment.postId,
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('Get comment by id', async () => {
    const commentId = (
      await request(app)
        .post('/comment')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(commentMock[3])
    ).body._id;
    const response = await request(app).get('/comment/' + commentId);

    expect(response.body._id).toBe(commentId);
  });

  test('Update comment by id', async () => {
    const commentId = (
      await request(app)
        .post('/comment')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(commentMock[4])
    ).body._id;
    commentMock[4].content = 'great post';
    const response = await request(app)
      .put('/comment/' + commentId)
      .set('Authorization', 'Bearer ' + accessToken)
      .send(commentMock[4]);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(commentMock[4].content);
  });

  test('Delete comment by id', async () => {
    const commentId = (
      await request(app)
        .post('/comment')
        .set('Authorization', 'Bearer ' + accessToken)
        .send(commentMock[5])
    ).body._id;
    const deleteResponse = await request(app)
      .delete('/comment/' + commentId)
      .set('Authorization', 'Bearer ' + accessToken);
    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(app).get('/comment/' + commentId);
    expect(getResponse.statusCode).toBe(404);
  });
});
