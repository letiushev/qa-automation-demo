import { test, expect } from "../../fixtures/api.fixture";
import type { Post } from "../../types/Post";

test("@smoke get post by id", async ({ postsApi }) => {
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);

  const body: Post = await response.json();

  expect(body.id).toBe(1);
  expect(body.userId).toBe(1);
  expect(body.title).toBeTruthy();
  expect(body.body).toBeTruthy();
});

test("@smoke create post", async ({ postsApi }) => {
  const post = {
    title: "Playwright API test",
    body: "Created by automated test",
    userId: 1,
  };

  const response = await postsApi.createPost(post);

  expect(response.status()).toBe(201);

  const body: Post = await response.json();

  expect(body.title).toBe(post.title);
  expect(body.body).toBe(post.body);
  expect(body.userId).toBe(post.userId);
  expect(body.id).toBeDefined();
});

test("@regression get non-existing post", async ({ postsApi }) => {
  const response = await postsApi.getPost(999999);

  expect(response.status()).toBe(404);
});

test("@regression get post returns json", async ({ postsApi }) => {
  const response = await postsApi.getPost(1);

  expect(response.status()).toBe(200);

  const contentType = response.headers()["content-type"];

  expect(contentType).toContain("application/json");
});

test("@regression update post", async ({ postsApi }) => {
  const response = await postsApi.updatePost(1, {
    title: "Updated by Playwright",
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.id).toBe(1);
  expect(body.title).toBe("Updated by Playwright");
});

test("@regression delete post", async ({ postsApi }) => {
  const response = await postsApi.deletePost(1);

  expect(response.status()).toBe(200);
});
