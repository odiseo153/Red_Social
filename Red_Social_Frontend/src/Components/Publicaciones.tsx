import { useEffect, useState } from 'react';
import QueEstasPensando from './QueEstasPensando';
import { GetPublicaciones, Like } from '../Api/ApiController';
import Loading from './Loading';
import { Publicaciones } from '../Interfaces/Interfaces';

const CalipsoPost = () => {
  const [activeTab, setActiveTab] = useState('para-ti');
  const [posts, setPosts] = useState<Publicaciones[]>([]);
  const [visibleComments, setVisibleComments] = useState<{ [key: string]: boolean }>({});
  const [cambio, setCambio] = useState(false)


  useEffect(() => {
    const GetData = async () => {
      try {
        const respuesta = await GetPublicaciones();

        console.log(respuesta);

        if (Array.isArray(respuesta)) {
          setPosts(respuesta);
        } else {
          console.error('La respuesta no es un arreglo:', respuesta);
        }
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };

    GetData();
  }, [cambio]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCambio(prevCambio => !prevCambio);
    }, 2000);
    return () => clearInterval(interval);
  }, [cambio]);

  const PostLike = async (postId: string) => {
    await Like(postId);
  };

  const toggleComments = (postId: string) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  return (
    <div className="mx-auto rounded-lg shadow-md p-5 bg-dark h-screen overflow-y-scroll">
      <div className="flex w-full space-x-2 border-b border-gray-300 pb-2">
        <button
          className={`w-1/2 py-2 rounded-full text-sm font-semibold focus:outline-none transition-colors duration-300 ${activeTab === 'para-ti' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
          onClick={() => setActiveTab('para-ti')}
        >
          Para ti
        </button>
        <button
          className={`w-1/2 py-2 rounded-full text-sm font-semibold focus:outline-none transition-colors duration-300 ${activeTab === 'siguiendo' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-200'
            }`}
          onClick={() => setActiveTab('siguiendo')}
        >
          Siguiendo
        </button>
      </div>

      {/* Asegúrate de que QueEstasPensando esté visible antes de las publicaciones */}
      <QueEstasPensando />

      {/* Mostrar un indicador de carga mientras se obtienen las publicaciones */}
      {posts.length === 0 && <Loading />}

      {/* Mapeo de las publicaciones */}
      <div className="p-3">
        {Array.isArray(posts) && posts.map((e, i) => (
          <a
            className="border-2 mr-3 mt-4 p-2 text-white flex items-start rounded-lg cursor-pointer duration-300 hover:bg-dark-200 hover:mt-1"
            href={`/status/${e.id}`}
            key={i}
          >
            <img src={e.imagen} alt="Avatar" className="rounded-full w-12 h-12 mr-4" />
            <div className="flex-1">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold">{e.nombreUser}</h2>
                <span className="ml-2">@{e.nombreUser}</span>
              </div>
              <p className="mt-2">{e.contenido}</p>

              <div className="flex p-1 w-full items-center mt-4 text-gray-500">
                <button
                  className="flex items-center mr-4 p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition duration-300"
                  onClick={() => PostLike(e.id)}
                >
                  <i className={`fa-${e.likedByUser ? 'solid' : 'regular'} fa-heart`}></i>
                  <span className="ml-2">{e.likes}</span>
                </button>
                <button
                  className="flex items-center p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition duration-300"
                >
                  <i className="fa-solid fa-comment"></i>
                  <span className="ml-2">{e.comentarios.length}</span>
                </button>

                {e.comentarios.length != 0 &&
                  <div>
                    <button
                      className="flex items-center p-2 rounded-full hover:bg-blue-100 hover:text-blue-500 transition duration-300"
                      onClick={() => toggleComments(e.id)}
                    >
                      <i className="fa-solid fa-comment"></i>
                      <span className="ml-2">Ver comentarios</span>
                    </button>
                  </div>
                }
              </div>

              {visibleComments[e.id] && (
                <div className="mt-4">
                  {e.comentarios.map((c, j) => (
                    <div key={j} className="p-2 flex border-t border-gray-300 pt-2 mt-2">
                      <img className="rounded-full w-10" src={c.imagen} alt="." />
                      <p className="ml-2 mt-1">{c.content}</p>
                    </div>
                  ))}
                </div>
              )}


            </div>
          </a>
        ))}
      </div>
    </div>

  );
};

export default CalipsoPost;
