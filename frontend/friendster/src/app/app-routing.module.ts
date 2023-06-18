import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PostComponent } from './post/post.component';
import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups/groups.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'edit',
    component: EditUserComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'group/:id',
    component: GroupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
