// Interfaces/Message.ts
export interface Messages {
    id: string;
    senderId: string;
    receiverId: string;
    userName: string;
    imagen: string;
    content: string;
    timestamp: string;
}

export interface MessageStart{
    id: string;
    userId: string;
    imagen: string;
    userName: string;
    isRead:boolean;
    content: string;
    conversationId:string;
}

export interface Publicaciones {
    id:string;
    comentarios:Comentario[];
    contenido:string;
    imagen:string;
    likes:number;
    nombreUser:string;
    user:string;
    likedByUser:boolean;
}

export interface ApiResponse {
    response: string;
    hasFail: boolean;
    error: string;
    status: number;
}

export type Usuario = {
    id: string;
    userName: string;
    email: string;
    imagen: string;
    bio: string;
    posts: number;
    followers: number;
    following: number;
};

export type Comentario = {
    id: string;
    userName: string;
    postId: string;
    content: string;
    imagen:string;
};

export interface Follow{
    following:{
        id:string;
        userId:string;
        userName:string;
        imagen:string;
       }[];

    followers:{
        id:string;
        userId:string;
        userName:string;
        imagen:string;
    }[];
    
}