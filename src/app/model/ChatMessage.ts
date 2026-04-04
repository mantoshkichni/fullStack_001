export interface ChatMessage{
    senderId:string;
    receiverId:string;
    content:string;
    timeSTamp?:string;
    isQuickMessage?:boolean;
}