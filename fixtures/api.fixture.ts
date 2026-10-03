import { test as base } from "@playwright/test";
import { PostsApi } from "../api/PostsApi";

type ApiFixtures = {
  postsApi: PostsApi;
};

export const test = base.extend<ApiFixtures>({
  postsApi: async ({ request }, use) => {
    await use(new PostsApi(request));
  },
});

export { expect } from "@playwright/test";
