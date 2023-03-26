import { Post } from "./core/model/post.model";

export interface AppState {
    readonly storedPosts: Post[];
  }