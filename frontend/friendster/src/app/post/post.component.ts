import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Post } from '../model/post';
import { ReactionService } from '../service/reaction.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  public posts: Post[]
  public user
  public postToEdit: Post = new Post()
  public postContent = ""

  constructor(private userService: UserService,
    private authService: AuthService,
    private reactionService: ReactionService,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService){}

  ngOnInit(): void {
    this.posts = []

    if (!this.authService.tokenIsPresent()){
      this.router.navigate(['/login'])
    }

    this.userService.getMyInfo().subscribe(
      data => {this.user = data}
    );

    this.getPosts();

  }

  public getPosts(){

    this.posts = []

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
      this.reactionService.create("LIKE", this.user.id, postId).subscribe(data => {
        
      })
      }
    }
  }

  public unlike(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserLiked = false
      this.posts[i].numOfLikes = this.posts[i].numOfLikes - 1
      this.reactionService.delete("LIKE", this.user.id, postId).subscribe(data => {

      })
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
      this.reactionService.create("HEART", this.user.id, postId).subscribe(data => {
        
      })
      }
    }
  }

  public unheart(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserHearted = false
      this.posts[i].numOfHearts = this.posts[i].numOfHearts - 1
      this.reactionService.delete("HEART", this.user.id, postId).subscribe(data => {
        
      })
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
      this.reactionService.create("DISLIKE", this.user.id, postId).subscribe(data => {
        
      })
      }
    }
  }

  public undislike(postId: string){
    var i
    for (i = 0; i < this.posts.length; i++){
      if (this.posts[i].id == postId){
      this.posts[i].thisUserDisliked = false
      this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
      this.reactionService.delete("DISLIKE", this.user.id, postId).subscribe(data => {
        
      })
      }
    }
  }

  public writePost(post: Post){

      document.getElementById("backdrop").style.display = "block"
      document.getElementById("postModal").style.display = "block"
      document.getElementById("postModal").classList.add("show")

      if (post != null){
        this.postContent = post.content
        document.getElementById("postcontent").innerText = post.content
        document.getElementById("postbtn").innerHTML = "Save changes"
        this.postToEdit = post
      } else {
        document.getElementById("postbtn").innerHTML = "Post"
      }
  
  }

  public closePostModal(){
      document.getElementById("backdrop").style.display = "none"
      document.getElementById("postModal").style.display = "none"
      document.getElementById("postModal").classList.remove("show")

      this.postToEdit = new Post()
      this.postContent = ""
  }

  public createPost(){
    if (this.postToEdit.id != "" && this.postToEdit.id != null && this.postToEdit.id != undefined){
      this.editPost(this.postToEdit)
    } else {
      var post = new Post();
      post.content = this.postContent
      post.poster = this.user.username
    this.postService.create(post).subscribe(
      data => {
        this.getPosts()
        this.closePostModal()}
    );
    }
  }

  public editPost(post: Post){
    var index = this.posts.indexOf(post)
    post.content = this.postContent
    this.posts[index].content = post.content
    this.postService.edit(post).subscribe(
      data => {}
    )
    this.closePostModal()
  }

  public deletePost(post: Post){
    this.postService.delete(post).subscribe(
      data => {}
    );
    var index = this.posts.indexOf(post)
    this.posts.splice(index, 1)

    this.closePostModal()
  }
}
