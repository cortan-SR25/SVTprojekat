import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { GroupService } from '../service/group.service';
import { UserService } from '../service/user.service';
import { Group } from '../model/group';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  public user
  public group: Group
  private id

  constructor(private groupService: GroupService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService){}


  ngOnInit(): void {
    
    if (!this.authService.tokenIsPresent()){
      this.router.navigate(['/login'])
    }

    this.route.paramMap.subscribe(obs =>{
      this.id = obs.get('id')
    })

    this.userService.getMyInfo().subscribe(
      data => {this.user = data
        this.getGroup(this.id)}
    );
  }

  public getGroup(id){
    this.groupService.getGroup(id).subscribe(
      data => {
        this.group = data
        if (this.user.role == 'USER' && this.group.isSuspended){
          this.router.navigate(['/groups'])
        }
        var dateString = JSON.stringify(data.creationDate)
          var dateString1 = dateString.replace("[", "")
          var dateString2 = dateString1.replace("]", "")
          var date = dateString2.split(",", 6)
          var year = date[0];
          var month = date[1];
          var day = date[2];
          var hour = date[3];
          var minute = date[4];
          var second = date[5]; 
          if (day.length == 1){
            day = "0" + day
          }
          if (month.length == 1){
            month = "0" + month
          }
          if (hour.length == 1){
            hour = "0" + hour
          }
          if (minute.length == 1){
            minute = "0" + minute
          }
          if (second.length == 1){
            second = "0" + second
          }
          this.group.creationDate = day + "/" + month + "/" + year
          + " " + hour + ":" + minute + ":" + second
      }
      ,
      err => {
        this.router.navigate(['/groups'])
      }
    )
  }

}
