import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Post } from '../model/post';

@Injectable({
  providedIn: 'root'
})

export class PostService {

    constructor(
        private apiService: ApiService,
        private config: ConfigService
      ) {
      }

      delete(post: Post){

        var postDTO = {
            "id": post.id,
            "content": post.content,
            "poster": post.poster
        }

        const postHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.delete_post_url, JSON.stringify(postDTO), postHeaders)
          .pipe(map(() => {
          }));
      }

      create(post: Post){

        var postDTO = {
            "content": post.content,
            "poster": post.poster
        }
        const postHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          });
          return this.apiService.post(this.config.create_post_url, JSON.stringify(postDTO), postHeaders)
            .pipe(map(() => {
            }));
      }

      edit(post: Post){

        var postDTO = {
            "id": post.id,
            "content": post.content,
            "poster": post.poster
        }

        const postHeaders = new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        });
        return this.apiService.post(this.config.edit_post_url, JSON.stringify(postDTO), postHeaders)
          .pipe(map(() => {
          }));
      }

      getPosts(){
        return this.apiService.get(this.config.all_posts_url);
      }

}