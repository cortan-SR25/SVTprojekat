import { Component } from '@angular/core';
import { UserService } from './service/user.service';
import { AuthService } from './service/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'friendster';

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router){}

    logout(){
      this.authService.logout();
      this.router.navigate(['/login'])
    }
}
