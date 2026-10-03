export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostRequest {
  title?: string;
  body?: string;
}
