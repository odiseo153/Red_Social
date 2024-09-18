import React, {  useState } from 'react';
import EmojiPicker,{EmojiClickData}  from 'emoji-picker-react';
import { Usuario } from '../Interfaces/Interfaces';
import { CreatePost } from '../Api/ApiController';
import { useUser } from '../Context';



const QueEstasPensando = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const [post,setPost] = React.useState({
    content:"",
    userId:sessionStorage.getItem("Id") || ""
  });

  const { usuario  } = useUser();
    const user = usuario as Usuario;

  const onEmojiClick = (emojiObject:EmojiClickData ) => {
    //setTweet(tweet+emojiObject.emoji)

    setPost(prevPost => ({
      ...prevPost,
      content:prevPost.content+emojiObject.emoji,
    }));

  };
 
  const handleChange = (e: { target: { value: string; }; }) => {
    setPost(prevPost => ({
      ...prevPost,
      content:e.target.value,
    }));

  };

  const handleTweet =async () => {
    // Lógica para enviar el tweet

    console.log('Tweet enviado:', post);
    await CreatePost(post);
    setPost(prevPost => ({
      ...prevPost,
      content:"",
    }));
  };

  
  return (
    <div className="border-2  border-gray-300 mt-3 p-4 rounded-lg shadow-sm">
      <div className="flex space-x-4">
        <img
          src={user?.imagen ?? " "}
          alt="Profile"
          className="rounded-full w-15 h-12 mr-4"
        />

        <div className="relative w-full ">
          <input
            className="text-white  bg-transparent w-full px-4 py-2 border-none border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-none"
            placeholder="Que estas Pensando??"
            required
            type="text"
            value={post.content ?? ""}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <span
            className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${isFocused ? 'bg-gradient-to-r from-red-400 via-yellow-300 to-blue-400 w-full' : 'w-0'
              }`}
          ></span>
        </div>


      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2 text-blue-500">

          <div className="relative">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full"
            >
              😀
            </button>
            {showPicker && (
              <div className="absolute top-12 left-0">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>


        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full font-bold hover:bg-blue-600"
          onClick={handleTweet}
          disabled={post.content.length == 0}
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default QueEstasPensando;

