import { Component, OnInit } from '@angular/core';
import { Group } from '../model/group';
import { GroupService } from '../service/group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit{

  public groups: Group[]
  public user
  public groupToEdit
  public groupName: string
  public groupDesc: string

  constructor(private groupService: GroupService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService){}

  ngOnInit(): void {

    if (!this.authService.tokenIsPresent()){
      this.router.navigate(['/login'])
    }

    this.userService.getMyInfo().subscribe(
      data => {this.user = data}
    );

    this.groupToEdit = new Group()

    this.getGroups()
  }

  public getGroups(){

    this.groups = []

    this.groupService.getGroups().subscribe(
      data => {
        this.groups = data
      }
    )
  }

  public createGroup(){

    document.getElementById("backdrop").style.display = "block"
    document.getElementById("groupModal").style.display = "block"
    document.getElementById("groupModal").classList.add("show")

    document.getElementById("groupModalLabel").innerHTML = "Create group"
    document.getElementById("postbtn").innerHTML = "Create"
  }

  public editGroup(group: Group){

    this.groupToEdit = group
    this.groupName = group.name
    this.groupDesc = group.description

    document.getElementById("backdrop").style.display = "block"
    document.getElementById("groupModal").style.display = "block"
    document.getElementById("groupModal").classList.add("show")

    document.getElementById("groupModalLabel").innerHTML = "Edit group"
    document.getElementById("postbtn").innerHTML = "Edit"
  }

  public deleteGroup(group: Group){

    let isExecuted = confirm("Are you sure you want to delete this group?");

    if (isExecuted){
    this.groupService.delete(group).subscribe(
      data => 
        this.getGroups()
      ,
      err => 
        alert("To delete this group please contact the administrator.")
      
    )
    }

  }

  public closeGroupModal(){

    document.getElementById("backdrop").style.display = "none"
    document.getElementById("groupModal").style.display = "none"
    document.getElementById("groupModal").classList.remove("show")

    this.groupToEdit = new Group()
    this.groupName = ""
    this.groupDesc = ""
  }

  public saveGroup(){
    
    if (this.groupToEdit.id != "" && this.groupToEdit.id != null 
                                  && this.groupToEdit.id != undefined){
      this.groupToEdit.name = this.groupName
      this.groupToEdit.description = this.groupDesc 
      this.groupService.edit(this.groupToEdit).subscribe(
        data => {
          this.closeGroupModal()
        }
      )
    } else {
      var group = new Group()
      group.name = this.groupName
      group.description = this.groupDesc
      group.groupAdmin = new User()
      group.groupAdmin.id = this.user.id
      group.groupAdmin.username = this.user.username
      this.groupService.create(group).subscribe(
        data => {
          this.getGroups()
          this.closeGroupModal()
        }
      )
    }
  }

}
