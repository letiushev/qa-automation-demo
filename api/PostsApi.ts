import type { APIRequestContext, APIResponse } from "@playwright/test";

import type { CreatePostRequest, UpdatePostRequest } from "../types/Post";

export class PostsApi {
  readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getPost(id: number): Promise<APIResponse> {
    return await this.request.get(`/posts/${id}`);
  }

  async createPost(data: CreatePostRequest): Promise<APIResponse> {
    return await this.request.post("/posts", {
      data,
    });
  }

  async updatePost(id: number, data: UpdatePostRequest): Promise<APIResponse> {
    return await this.request.patch(`/posts/${id}`, {
      data,
    });
  }

  async deletePost(id: number): Promise<APIResponse> {
    return await this.request.delete(`/posts/${id}`);
  }
}
