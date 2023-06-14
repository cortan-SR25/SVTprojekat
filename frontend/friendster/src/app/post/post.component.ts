import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Post } from '../model/post';
import { ReactionService } from '../service/reaction.service';
import { PostService } from '../service/post.service';
import { User } from '../model/user';
import { Reaction } from '../model/reaction';

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
  public reactions = []

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

    this.postService.getPosts().subscribe(
      data => {
        for (let dataPost of data) {
          var post = new Post()
          post.id = dataPost.id
          post.content = dataPost.content
          var dateString = JSON.stringify(dataPost.creationDate)
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
          post.creationDate = day + "/" + month + "/" + year
                              + " " + hour + ":" + minute + ":" + second
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

          post.likes = numOfLikes
          post.hearts = numOfHearts
          post.dislikes = numOfDislikes

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
        var heart = this.posts[i].hearts.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].hearts.indexOf(heart)
        this.posts[i].hearts.splice(index, 1)
       }

       if (this.posts[i].thisUserDisliked) {
        this.posts[i].thisUserDisliked = false
        this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
        var dislike = this.posts[i].dislikes.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].dislikes.indexOf(dislike)
        this.posts[i].dislikes.splice(index, 1)
       }
      this.posts[i].thisUserLiked = true
      this.posts[i].numOfLikes = this.posts[i].numOfLikes + 1
      var liker = new User()
      liker.id = this.user.id
      liker.username = this.user.username
      var like = new Reaction()
      like.type = "LIKE"
      like.reactor = liker
      this.posts[i].likes.push(like)
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
      var like = this.posts[i].likes.find(x => x.reactor.id == this.user.id)
      var index = this.posts[i].likes.indexOf(like)
      this.posts[i].likes.splice(index, 1)
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
        var like = this.posts[i].likes.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].likes.indexOf(like)
        this.posts[i].likes.splice(index, 1)
       }

       if (this.posts[i].thisUserDisliked) {
        this.posts[i].thisUserDisliked = false
        this.posts[i].numOfDislikes = this.posts[i].numOfDislikes - 1
        var dislike = this.posts[i].dislikes.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].dislikes.indexOf(dislike)
        this.posts[i].dislikes.splice(index, 1)
       }
      this.posts[i].thisUserHearted = true
      this.posts[i].numOfHearts = this.posts[i].numOfHearts + 1
      var hearter = new User()
      hearter.id = this.user.id
      hearter.username = this.user.username
      var heart = new Reaction()
      heart.type = "HEART"
      heart.reactor = hearter
      this.posts[i].hearts.push(heart)
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
      var heart = this.posts[i].hearts.find(x => x.reactor.id == this.user.id)
      var index = this.posts[i].hearts.indexOf(heart)
      this.posts[i].hearts.splice(index, 1)
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
        var like = this.posts[i].likes.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].likes.indexOf(like)
        this.posts[i].likes.splice(index, 1)
       }

       if (this.posts[i].thisUserHearted) {
        this.posts[i].thisUserHearted = false
        this.posts[i].numOfHearts = this.posts[i].numOfHearts - 1
        var heart = this.posts[i].hearts.find(x => x.reactor.id == this.user.id)
        var index = this.posts[i].hearts.indexOf(heart)
        this.posts[i].hearts.splice(index, 1)
       }
      this.posts[i].thisUserDisliked = true
      this.posts[i].numOfDislikes = this.posts[i].numOfDislikes + 1
      var disliker = new User()
      disliker.id = this.user.id
      disliker.username = this.user.username
      var dislike = new Reaction()
      dislike.type = "DISLIKE"
      dislike.reactor = disliker
      this.posts[i].dislikes.push(dislike)
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
      var dislike = this.posts[i].dislikes.find(x => x.reactor.id == this.user.id)
      console.log(dislike)
      var index = this.posts[i].dislikes.indexOf(dislike)
      console.log(index)
      this.posts[i].dislikes.splice(index, 1)

      this.posts[i].dislikes
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

    let isExecuted = confirm("Are you sure you want to delete this group?");

    if (isExecuted){
    this.postService.delete(post).subscribe(
      data => {}
    );
    var index = this.posts.indexOf(post)
    this.posts.splice(index, 1)
    }
  }

  public checkReactions(selectedReactions: []){
    this.reactions = selectedReactions;
    if (selectedReactions.length == 0){
      return
    }

    if (this.reactions[0].type == "LIKE"){
      document.getElementById("reactionModalLabel").innerHTML = "Likes"
    } else if (this.reactions[0].type == "HEART"){
      document.getElementById("reactionModalLabel").innerHTML = "Hearts"
    } else {
      document.getElementById("reactionModalLabel").innerHTML = "Dislikes"
    }

    document.getElementById("backdrop").style.display = "block"
    document.getElementById("reactionModal").style.display = "block"
    document.getElementById("reactionModal").classList.add("show")
  }

  public closeReactionModal(){
    document.getElementById("backdrop").style.display = "none"
    document.getElementById("reactionModal").style.display = "none"
    document.getElementById("reactionModal").classList.remove("show")
    this.reactions = []
  }
}
