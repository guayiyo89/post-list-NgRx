import { Action } from '@ngrx/store';
import { Post } from '../model/post.model';

export const ADD_POST = '[POST] Add';
export const REMOVE_POST = '[POST] Remove';

export class AddPost implements Action {
  readonly type = ADD_POST;

  constructor(public payload: Post) {}
}

export class RemovePost implements Action {
  readonly type = REMOVE_POST;

  constructor(public id: number) {}
}

export type Actions = AddPost | RemovePost;
