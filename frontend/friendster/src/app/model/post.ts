import { Reaction } from "./reaction";

export class Post {
    id: string;
    content: string;
    creationDate: string;
    poster: string;
    groupId: string;
    thisUserLiked: boolean;
    thisUserHearted: boolean;
    thisUserDisliked: boolean;
    numOfLikes: number;
    numOfHearts: number;
    numOfDislikes: number;
    likes: Reaction[];
    hearts: Reaction[];
    dislikes: Reaction[];
}