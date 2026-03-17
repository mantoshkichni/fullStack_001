import { User } from "./UserDto";
import { Comment } from "./CommentDTO";
export class Post {
    postId?: number;
    title?: string;
    description?: string;
    urlToImage?:string;
    createdAt?: Date;
    comments?: Comment[];
    shares?: number;
    likes?: number;
    dislikes?: number;
    user?: User;

    constructor(
        postId?: number,
        title?: string,
        description?: string,
        urlToImage?:string,
        createdAt?: Date,
        comments?: Comment[],
        shares?: number,
        likes?: number,
        dislikes?: number,
        user?: User
    ) {
        this.postId = postId;
        this.title = title;
        this.description = description;
        this.urlToImage=urlToImage;
        this.createdAt = createdAt;
        this.comments = comments;
        this.shares = shares;
        this.likes = likes;
        this.dislikes = dislikes;
        this.user = user;
    }
}