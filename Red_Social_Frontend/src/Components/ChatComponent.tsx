/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from 'react';
import { userId } from '../Api/ApiController';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

const ChatComponent = ({ 
   conversation,
   handleMessage, 
   setMessage,
   message
  }: 
  {
    message:string,
    conversation: any[],
    handleMessage: () => void,
    setMessage: Dispatch<SetStateAction<string>> 
  }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const onEmojiClick = (emojiObject: EmojiClickData) => {
    console.log(emojiObject.emoji);
  };

  const filteredConversation = conversation.filter((msg) => 
    msg.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function timeAgo(dateString: string): string {
    const now = new Date(); 
    const pastDate = new Date(dateString);
    const diff = now.getTime() - pastDate.getTime();
  
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
  
    if (years > 0) {
      return years === 1 ? 'hace 1 año' : `hace ${years} años`;
    }
    if (months > 0) {
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    }
    if (days > 0) {
      return days === 1 ? 'hace 1 dia' : `hace ${days} dias`;
    }
    if (hours > 0) {
      return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
    }
    if (minutes > 0) {
      return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
    }
    return seconds === 1 ? 'hace 1 segundo' : `hace ${seconds} segundos`;
  }
 
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between p-4 sm:p-6 bg-white border-b">
          <div className="flex items-center gap-3">

          </div>
          <div className="relative flex-1 sm:max-w-md">
            <input
              type="text"
              className="w-full border-gray-200 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Buscar mensaje"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>


        </header>
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="space-y-4">
            {filteredConversation.map((msg, index) => (
              <div key={index} className={`flex ${msg.senderId === userId ? 'justify-end' : ''}`}>
                <div className={`max-w-[70%] rounded-lg px-4 py-3 text-sm ${msg.senderId === userId ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                  <p className="break-all">{msg.content}</p>
                  <div className="mt-1 text-xs text-dark">{timeAgo(msg.timestamp)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 border-t">
          <div className="flex items-center gap-2">
            <button
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setShowPicker(!showPicker)}
              aria-label="Toggle Emoji Picker"
            >
              <i className="far fa-smile"></i>
            </button>
            {showPicker && (
              <div className="absolute mt-8">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
            <input
              className="flex-1 resize-none border-gray-200 rounded-md p-2 focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="text-blue-600 hover:text-gray-900 focus:outline-none"
              onClick={handleMessage}
              aria-label="Send message"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
