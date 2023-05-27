import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Post } from '../model/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: Post[]
  public user

  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.posts = []

    if (!this.authService.tokenIsPresent()){
      this.router.navigate(['/login'])
    }

    this.userService.getMyInfo().subscribe(
      data => {this.user = data}
    );

    this.userService.getPosts().subscribe(
      data => {
        for (let dataPost of data) {
          var post = new Post()
          post.id = dataPost.id
          post.content = dataPost.content
          post.creationDate = dataPost.creationDate
          post.groupId = null
          post.poster = dataPost.poster.username

          if (dataPost.reactions != null && dataPost.reactions != null){

          var numOfLikes = dataPost.reactions.filter(x => x.type == 'LIKE')
          var numOfDislikes = dataPost.reactions.filter(x => x.type == 'DISLIKE')
          var numOfHearts = dataPost.reactions.filter(x => x.type == 'HEART')

          var thisUserLiked = numOfLikes.find(x => x.reactor.id == this.user.id)
          var thisUserDisliked = numOfDislikes.find(x => x.reactor.id == this.user.id)
          var thisUserHearted = numOfHearts.find(x => x.reactor.id == this.user.id)

          post.numOfLikes = numOfLikes.length
          post.numOfDislikes = numOfDislikes.length
          post.numOfHearts = numOfHearts.length

          if (thisUserLiked != undefined && thisUserLiked != null){
            post.thisUserLiked = true
          }
          if (thisUserDisliked != undefined && thisUserDisliked != null){
            post.thisUserDisliked = true
          }
          if (thisUserHearted != undefined && thisUserHearted != null){
            post.thisUserHearted = true
          }
          } else {
            post.numOfDislikes = 0
            post.numOfLikes = 0
            post.numOfHearts = 0
          }
          this.posts.push(post)
      }
    }
    );

  }

  public like(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
       if (this.posts[i].thisUserHearted) {
        this.posts[i].thisUserHearted = false
        this.posts[i].numOfHearts = this.posts[i].numOfHearts - 1
       }

       if (this.posts[i].thisUserDisliked) {
        this.posts[i].thisUserDisliked = false
        this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
       }
      this.posts[i].thisUserLiked = true
      this.posts[i].numOfLikes = this.posts[i].numOfLikes + 1
      }
    }
  }

  public unlike(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserLiked = false
      this.posts[i].numOfLikes = this.posts[i].numOfLikes - 1
      }
    }
  }

  public heart(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
       if (this.posts[i].thisUserLiked) {
        this.posts[i].thisUserLiked = false
        this.posts[i].numOfLikes = this.posts[i].numOfLikes - 1
       }

       if (this.posts[i].thisUserDisliked) {
        this.posts[i].thisUserDisliked = false
        this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
       }
      this.posts[i].thisUserHearted = true
      this.posts[i].numOfHearts = this.posts[i].numOfHearts + 1
      }
    }
  }

  public unheart(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserHearted = false
      this.posts[i].numOfHearts = this.posts[i].numOfHearts - 1
      }
    }
  }

  public dislike(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
       if (this.posts[i].thisUserLiked) {
        this.posts[i].thisUserLiked = false
        this.posts[i].numOfLikes = this.posts[i].numOfLikes - 1
       }

       if (this.posts[i].thisUserHearted) {
        this.posts[i].thisUserHearted = false
        this.posts[i].numOfHearts = this.posts[i].numOfHearts - 1
       }
      this.posts[i].thisUserDisliked = true
      this.posts[i].numOfDislikes = this.posts[i].numOfDislikes + 1
      }
    }
  }

  public undislike(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserDisliked = false
      this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
      }
    }
  }
}