import mongoose from "mongoose";
import { comment } from "../model/commentModel";
import { initApp } from "..";
import { Express } from "express";
import request from "supertest";
import { Comment } from "../utils/types/comment";

const commentMock: Comment[] = [
  {
    sender: "aaaa",
    postId: "1234",
    content: "this post is great",
    date: new Date(),
  },
  {
    sender: "bbbb",
    postId: "5678",
    content: "this post is excellent",
    date: new Date(),
  },
  {
    sender: "cccc",
    postId: "1234",
    content: "this post is good",
    date: new Date(),
  },
  {
    sender: "dddd",
    postId: "11111",
    content: "this post is fine",
    date: new Date(),
  },
  {
    sender: "eeee",
    postId: "222",
    content: "Nice post",
    date: new Date(),
  },
  {
    sender: "ffff",
    postId: "333",
    content: "Excellent post",
    date: new Date(),
  },
];

let app: Express;
beforeAll(async () => {
  app = await initApp();
  await comment.deleteMany();
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Comments API", () => {
  test("Get comments empty db", async () => {
    const response = await request(app).get("/comment");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("Post a new comment", async () => {
    const response = await request(app).post("/comment").send(commentMock[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body).toMatchObject({
      ...commentMock[0],
      date: commentMock[0].date.toISOString(),
    });
  });

  test("Post two comments", async () => {
    const response = await request(app)
      .post("/comment")
      .send([commentMock[1], commentMock[2]]);
    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(2);
  });

  test("Get comments after post", async () => {
    const response = await request(app).get("/comment");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });

  test("Get comments by post id", async () => {
    const comment = commentMock[0];
    const response = await request(app).get(
      "/comment?postId=" + comment.postId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test("Get comment by id", async () => {
    const commentId = (await request(app).post("/comment").send(commentMock[3]))
      .body._id;
    const response = await request(app).get("/comment/" + commentId);

    expect(response.body._id).toBe(commentId);
  });

  test("Update comment by id", async () => {
    const commentId = (await request(app).post("/comment").send(commentMock[4]))
      .body._id;
    commentMock[4].content = "great post";
    const response = await request(app)
      .put("/comment/" + commentId)
      .send(commentMock[4]);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(commentMock[4].content);
  });

  test("Delete comment by id", async () => {
    const commentId = (await request(app).post("/comment").send(commentMock[5]))
      .body._id;
    const deleteResponse = await request(app).delete("/comment/" + commentId);
    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(app).get("/comment/" + commentId);
    expect(getResponse.statusCode).toBe(404);
  });
});
