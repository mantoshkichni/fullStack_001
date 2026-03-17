import { Post } from "./PostDTO";
export class Comment{
    constructor(
        commentId?:number,
    comment?:string,
    createdAt?:Date,
    post?:Post,
    ){}
}