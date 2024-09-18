/* eslint-disable @typescript-eslint/no-explicit-any */
import { Comentario, Follow, Messages, MessageStart, Publicaciones, Usuario } from "../Interfaces/Interfaces"
import { Message } from "../MensajeEmergente/Mensaje"
import { Url } from "./Url"
import { CreateCommentDTO } from "../DTO/CreateCommentDTO.ts"
//import {token} from 'Token.ts'

export const userId = sessionStorage.getItem("Id");

const handleError = (error: Error) => {
    console.error("API call failed:", error);
    Message.errorMessage(error.message || "An unexpected error occurred");
    throw error;
};

const getHeaders = (contentType = "application/json") => {
    const token = sessionStorage.getItem("token") || "";
    return {
        "Content-Type": contentType,
        "Authorization": `Bearer ${token}`

    };
};

const options = (method: string, data?: object, contentType = "application/json") => {
    return {
        method,
        headers: getHeaders(contentType),
        body: data ? JSON.stringify(data) : data
    };
};

export const RegisterUser = async (userName: string, email: string, passWord: string, phoneNumber: string, imagen: string) => {
    const user = { userName, email, passWord, bio: "la vida es bella cuando la empiezas a ver asi", phoneNumber, imagen };

    try {
        const request = await fetch(`${Url}User`, options("POST", user));
        const response = await request.json();

        if (response.error) {
            Message.errorMessage(response.error);
            return;
        }

        if (response.response && response.response.id) {

            Message.successMessage("Bienvenid@");

            setTimeout(() => {
                window.location.href = "/home";
            }, 1000);
        } else {
            Message.errorMessage("Error en el servidor");
        }

    } catch (error) {
        handleError(error as Error);

    }
};

export const GetPublicaciones = async (general: boolean = true, idUser: string | undefined = undefined): Promise<any[]> => {
    try {
        const request = await fetch(`${Url}Post/user/${idUser ?? userId}/${general}`, options("GET"));
        const response = await request.json();

        return response.response.$values;
    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const GetUsuario = async (id?: string): Promise<Usuario> => {
    try {

        const request = await fetch(`${Url}${id ?? userId}`, options("GET"));
        const response = await request.json();

        return response.response;

    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const GetUsuarios = async (): Promise<{ id: string, nombre: string, imagen: string }[] | null> => {
    try {

        const request = await fetch(`${Url}Users`, options("GET"));
        const response = await request.json();
        return response.response;
    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const GetComentarios = async (Id: string): Promise<Comentario[]> => {
    try {
        const request = await fetch(`${Url}Comments/${Id}`, options("GET"));
        const response = await request.json();

        return response.$values;
    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const GetPublicacion = async (Id: string): Promise<Publicaciones> => {
    try {
        const request = await fetch(`${Url}Post/${Id}/user/${userId}`, options("GET"));
        const response = await request.json();

        return response.response;
    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const CreateComment = async (comment: CreateCommentDTO): Promise<Comentario> => {
    try {
        const request = await fetch(`${Url}Comments`, options("POST", comment));
        const response = await request.json();

        if (response.hasFail == false) {
            Message.errorMessage(response.error);
        }

        Message.successMessage("Comentario agregado correctamente");
        return response.response as Comentario;
    } catch (error) {
        handleError(error as Error);
        return Promise.reject(error);
    }
};

export const CreatePost = async (post: { content: string, userId: string }): Promise<void> => {
    try {
        const request = await fetch(`${Url}Post`, options("POST", post));
        const response = await request.json();

        if (response.hasFail == false) {
            Message.errorMessage(response.error);
        }

        Message.successMessage("Publicacion agregada correctamente");
    } catch (error) {
        handleError(error as Error);
    }
};


export const Like = async (postId: string): Promise<void> => {

    const like = {
        postId,
        userId
    }

    try {
        const request = await fetch(`${Url}Like`, options("POST", like));
        const response = await request.json();

        if (response.hasFail == false) {
            Message.errorMessage(response.error);
        }

        Message.successMessage("Publicacion agregada correctamente");
    } catch (error) {
        handleError(error as Error);
    }
}



export const fetchMessages = async (): Promise<Messages[]> => {
    try {
        const response = await fetch(Url + `Message/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.response as Messages[];
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchConversation = async (idConversation: string): Promise<Message[]> => {
    try {
        const response = await fetch(Url + `Message/conversation/${idConversation}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        console.log(data)
        return data.response.$values as Message[];
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchMessagesStart = async (): Promise<MessageStart[]> => {
    try {
        console.log(userId)
        const response = await fetch(Url + `Message/start/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data) 
        return data.response.$values as MessageStart[];
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

// Función para enviar un nuevo mensaje
export const sendMessage = async (message: { senderId: string, receiverId: string, content: string }): Promise<void> => {
    try {
        const response = await fetch(Url + 'Message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const FollowUser = async (follow: { followerId: string, followingId: string }): Promise<void> => {
    try {
        const response = await fetch(Url + 'Follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(follow),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
      //  const data = await response.json();
        Message.successMessage("Ahora Sigues a este Usuario");

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const UnFollowUser = async (id: string): Promise<void> => {
    try {
        const response = await fetch(Url + `Follow/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
       // const data = await response.json();
        Message.informationMessage("Ahora ya no sigues a este Usuario");

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

export const GetFollowers = async (): Promise<Follow> => {
    try {
        const response = await fetch(Url + `Follow/${userId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();


        const follow = {
            following: data.response.following.$values,
            followers: data.response.followers.$values
        };

        return follow;

    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};



export const UpdateUser = async (user: object | undefined) => {

    try {

        const request = await fetch(`${Url}User`, options("PUT", user));
        const response = await request.json();

        if (response.error) {
            Message.errorMessage(response.error);
            return;
        }

        if (response.response && response.response.id) {

            Message.successMessage("Data Actualizada");

            setTimeout(() => {
                window.location.reload();
            }, 200);
        } else {
            Message.errorMessage("Error en el servidor");
        }

    } catch (error) {
        handleError(error as Error);

    }
};


