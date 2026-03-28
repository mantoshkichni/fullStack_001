export interface ChatMessage{
    senderId:number;
    receiverId:number;
    content:string;
    timeSTamp?:string;
}