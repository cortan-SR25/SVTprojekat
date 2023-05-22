import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {ConfigService} from './config.service';
import {map} from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser;

  constructor(
    private apiService: ApiService,
    private config: ConfigService
  ) {
  }

  getMyInfo() {
    return this.apiService.get(this.config.whoami_url)
      .pipe(map(user => {
        this.currentUser = user;
        return user;
      }));
  }

  getAll() {
    return this.apiService.get(this.config.users_url);
  }

  edit(data) {
    
    var user = {"username": "",
                "password": data.password,
                "firstName": "",
                "lastName": "",
                "email": ""              
  }
    const signupHeaders = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.apiService.post(this.config.edit_user_url, user, signupHeaders)
      .pipe(map(() => {
        console.log('Password successfully changed!');
      }));
  }

  // TODO: create post service and move this method there
  getPosts(){
    return this.apiService.get(this.config.all_posts_url);
  }

}