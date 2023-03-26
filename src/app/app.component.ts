import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './core/model/post.model';
import { PostService } from './core/service/post.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'post-list-ngrx';
  posts: Observable<Post[]>;
  submitted = false;
  newPostForm: FormGroup = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });
  filterText = new FormControl('');

  constructor(private postSvc: PostService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts() {
    console.log('sdjhsadhjas')
    this.posts = this.postSvc.listPosts();
  }

  deletePost(id: number) {
    this.postSvc.removePost(id);
  }

  createPost() {
    this.submitted = true;
    if(this.newPostForm.valid){
      let newPost: Post = {
        nombre: this.newPostForm.controls['nombre'].value,
        descripcion: this.newPostForm.controls['descripcion'].value
      }
      this.postSvc.addPost(newPost);
      this.posts = this.postSvc.listPosts();
    }
  }

  filterPosts() {
    this.posts = this.postSvc.filterPostbyName(this.filterText.value!)
  }

  public trackByItems(index: number, item: Post) {
    return item.id;
  }

  get f() { return this.newPostForm.controls; }
}
