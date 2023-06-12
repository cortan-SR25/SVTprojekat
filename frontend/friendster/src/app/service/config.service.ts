import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _api_url = 'http://localhost:8080/api';
  private _user_url = this._api_url + '/users';
  private _posts_url = this._api_url + '/posts';
  private _reactions_url = this._api_url + '/reactions';

  private _login_url = this._user_url + '/login';

  private _edit_user_url = this._user_url + '/edit';

  private _all_posts_url = this._posts_url + '/all';

  private _create_post_url = this._posts_url + '/create';

  private _edit_post_url = this._posts_url + '/edit';

  private _delete_post_url = this._posts_url + '/delete';

  private _create_reaction_url = this._reactions_url + '/create';

  private _delete_reaction_url = this._reactions_url + '/delete';

  get all_posts_url(): string {
    return this._all_posts_url;
  }

  get edit_user_url(): string {
    return this._edit_user_url;
  }

  get login_url(): string {
    return this._login_url;
  }

  private _whoami_url = this._user_url + '/whoami';

  get whoami_url(): string {
    return this._whoami_url;
  }

  private _users_url = this._user_url + '/all';

  get users_url(): string {
    return this._users_url;
  }
  
  //TODO: 
  private _signup_url = this._user_url + '/register';

  get signup_url(): string {
    return this._signup_url;
  }

  get create_reaction_url(): string{
    return this._create_reaction_url
  }

  get delete_reaction_url(): string{
    return this._delete_reaction_url
  }

  get create_post_url(): string{
    return this._create_post_url
  }

  get edit_post_url(): string{
    return this._edit_post_url
  }

  get delete_post_url(): string{
    return this._delete_post_url
  }

}