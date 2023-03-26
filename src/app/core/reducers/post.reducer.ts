import * as PostActions from '../actions/post.actions';
import { Post } from '../model/post.model';

import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface PostState extends EntityState<Post> {}

export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>({});

const initialState: Post = <Post>{}

export const initialPostState: PostState = adapter.getInitialState();

export function postReducers(
  state = initialPostState,
  action: PostActions.Actions
) {
  switch (action.type) {
    case PostActions.ADD_POST:
      return adapter.addOne(action.payload, state);
    case PostActions.REMOVE_POST:
      return adapter.removeOne(action.id, state);
    default:
      return state;
  }
}

export const getPostState = createFeatureSelector<PostState>('posts');

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors(getPostState);
