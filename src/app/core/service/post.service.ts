import { Injectable } from '@angular/core';
import { Dictionary } from '@ngrx/entity';
import { createSelector, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';

import * as PostActions from '../actions/post.actions';
import { Post } from '../model/post.model';
import * as PostReducer from '../reducers/post.reducer';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private allPosts;
  private filteredPosts;
  private postById;

  constructor(private store: Store<AppState>) {
    this.allPosts = createSelector(PostReducer.selectAll, (entities) => {
      return this.sortPostbyName(entities);
    });

    this.postById = (id: number) =>
      createSelector(PostReducer.selectEntities, (entities) => {
        return entities[id];
      });

    this.filteredPosts = (text: string) =>
      createSelector(PostReducer.selectAll, (entities) => {
        return this.sortPostbyName(entities).filter((post: Post) => post.nombre.includes(text));
      });
  }

  public addPost(data: Post) {
    data.id = Date.now();
    this.store.dispatch(new PostActions.AddPost(data));
  }

  public listPosts(): Observable<Post[]> {
    return this.store.pipe(select(this.allPosts));
  }

  public removePost(id: number) {
    return this.store.dispatch(new PostActions.RemovePost(id));
  }

  public getDetail(id: number) {
    return this.store.pipe(select(this.postById(id)));
  }

  public filterPostbyName(text: string) {
    return this.store.pipe(select(this.filteredPosts(text)));
  }

  public sortPostbyName(posts: Post[]) {
    return posts.sort((a, b) => a.nombre.localeCompare(b.nombre));
  }
}
