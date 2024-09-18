/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useEffect, useState } from 'react';
import { useUser } from '../Context';
import { fetchConversation, fetchMessagesStart, sendMessage } from '../Api/ApiController';
import { MessageStart } from '../Interfaces/Interfaces';
import ChatComponent from './ChatComponent';
import CompletedConversation from './AutoCompletedConversation';

interface MessageCount {
  [userId: string]: number;
}

export default function Message(){
  const { usuario } = useUser();
  const [messages, setMessages] = useState<MessageStart[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [messagesOld, setMessagesOld] = useState<MessageStart[]>([]);
  const [receiverId, setReceiverId] = useState("");
  const [conversationId, setConversationId] = useState("");
  const [cambio, setCambio] = useState(true);
  const [conversation, setConversation] = useState<any[]>([]);

  const [imagen, setImagen] = useState("");
  const [nombre, setNombre] = useState("");


  useEffect(() => {
    const loadMessages = async () => {
      try {
        const usuariosUnicos = new Set();
        const data = await fetchMessagesStart();

        const mensajesFiltrados = data.filter(message => {
          if (!usuariosUnicos.has(message.userId)) {
            usuariosUnicos.add(message.userId);
            return true;
          }
          return false;
        });

        setMessages(mensajesFiltrados);
        setMessagesOld(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [cambio]);

  useEffect(() => {
    const loadConversation = async () => {
      try {
        if (conversationId) {
          const data = await fetchConversation(conversationId);
          console.log(data);

          if (data && data.length > 0) {
            setConversation(data);
            console.log(data);

            // Filtrar los mensajes donde el senderId no sea igual al id del usuario actual
            const filteredMessages = data.filter(message => message.senderId !== usuario.id);

            if (filteredMessages.length > 0) {
              setReceiverId(filteredMessages[0].senderId);
            } else {
              console.warn('No messages found from other users in this conversation');
            }
          } else {
            console.warn('No messages found for this conversationId');
          }
        }
      } catch (error) {
        console.error('Error loading conversation:', error);
      }
    };

    loadConversation();
  }, [conversationId, cambio, usuario.id]);


   useEffect(() => {
    const interval = setInterval(() => {
      setCambio(prevCambio => !prevCambio);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
 
  
  const mensajesPorUsuario = messagesOld.reduce((acc: MessageCount, message) => {
    if (!message.isRead) {
      acc[message.userId] = (acc[message.userId] || 0) + 1;
    }
    return acc;
  }, {});

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    if (receiverId === "") {
      if (conversation.length > 0) {
        setReceiverId(conversation[0].receiverId);
      } else {
        console.error('Receiver ID is not set and conversation is empty');
        return;
      }
    }

    if (usuario.id === receiverId) {
      alert('Sender and receiver cannot be the same.');
      return;
    }

    try {
      const message = {
        senderId: usuario.id,
        receiverId: receiverId,
        content: newMessage,
      };

      console.log(message);
      console.log(usuario.id);
      console.log(receiverId);
      
     await sendMessage(message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container-fluid bg-white rounded-2 h-screen">
    <div className="row ">
      {/* Messages Section */}
      <section className="col-12 col-md-4 p-4 bg-dark border-end border-light overflow-auto">
        <div className="mb-4">
          <div className="input-group shadow-sm">
            <CompletedConversation setRecivierId={setReceiverId} setMessage={setNewMessage} enviarMensaje={handleSendMessage}/>
          </div>
        </div> 


        {messages.map((e, i) => (
          <a key={i} onClick={() => setConversationId(e.conversationId)}  className="mt-2  flex items-center gap-3 rounded-md p-2 hover:bg-muted/50" href="#" rel="ugc">
          <span className="relative flex shrink-0 overflow-hidden rounded-full h-10 w-10 border">
            <img className="aspect-square h-full w-full" src={e.imagen} alt="Profile" />
          </span>
          <div className="flex-1">
            <div className="text-sm text-white font-medium">{e.userName}</div>
            <div className="text-xs text-white text-muted-foreground">{e.content} {mensajesPorUsuario[e.id]}</div>
          </div>
        </a>
        ))}
      </section>
  
      {/* Chat Component */}
      <div className="col-12 col-md-8 d-flex flex-column h-screen bg-dark ">
      {conversationId && (
          <ChatComponent message={newMessage} conversation={conversation} handleMessage={handleSendMessage} setMessage={setNewMessage} />
        )}
        </div>
    </div>
  </div>
  );
}


