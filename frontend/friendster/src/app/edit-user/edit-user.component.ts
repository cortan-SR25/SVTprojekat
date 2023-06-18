import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

@ViewChild("password") password: ElementRef;
@ViewChild("repeatPassword") repeatedPassword: ElementRef;

public user
form: FormGroup;
public oldPassword
public newPassword
public repeatNewPassword

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(){

    this.oldPassword = ""
    this.newPassword = ""
    this.repeatNewPassword = ""

    if (!this.authService.tokenIsPresent()){
      this.router.navigate(['/login'])
    }

    this.userService.getMyInfo().subscribe(
      data => {this.user = data}
    );

    this.form = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
    });
  }

  public change(){

    if (this.newPassword != this.repeatNewPassword){
      alert("The new password doesn't match!")
      return
    }
    
      this.userService.edit(this.user.username, this.oldPassword, this.newPassword).subscribe(data => {
        this.authService.logout()
        this.router.navigate(['/login'])
      },
      err => {
        alert("This is not your current password!")
      })
    
  }

}
