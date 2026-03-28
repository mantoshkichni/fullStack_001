import { User } from "./UserDto";

export interface LoginResponse{
    message:string;
    status:string;
    user:any;
}