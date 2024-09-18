import { useEffect, useState } from 'react';
import Post from './Post';
import { useParams } from 'react-router-dom';
import { FollowUser, GetUsuario, userId } from '../../Api/ApiController';
import { useUser } from '../../Context';
import Loading from '../Loading';
import { Modal } from './Modal';


export default function Profile() {
  const { usuario } = useUser();
  const [user, setUser] = useState(usuario);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Establecer el estado de carga a true antes de obtener los datos
      try {
        const _user = await GetUsuario(id);
        setUser(_user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Establecer el estado de carga a false después de obtener los datos
      }
    };

    fetchData();
  }, [id, usuario]);

  const handleFollow = async () => {
    try {
      // await FollowUser(user.id);  // Llama a la función para seguir al usuario
      // Actualiza el estado del usuario si es necesario
      setUser(prevUser => ({ ...prevUser, isFollowing: true }));
      const follow = {
        followerId: userId ?? "",
        followingId: id ?? ""
      }

      await FollowUser(follow)
    } catch (error) {
      console.error('Error following user:', error);
    }
  };
  
  return (
    <div className="w-full h-screen mx-auto">
      <div className="bg-[#15202b] rounded-t-2xl">
      {loading && // Mostrar el indicador de carga mientras se obtienen los datos
          <div className="flex justify-center items-center h-screen">
            <div className="loader"><Loading /> </div>
          </div>
        }
        <div className="h-36 bg-[#1c2938] rounded-t-2xl relative">
          <img
            src={user.imagen}
            alt="Cover image"
            width={800}
            height={200}
            className="object-cover w-full h-full rounded-t-2xl"
          />
          <div className="absolute bottom-0 left-4 -translate-y-1/2">
            <div className="w-24 h-24 border-4 border-[#15202b] rounded-full overflow-hidden">
              <img src={user.imagen} alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xl font-bold">{user.userName}</div>
              <div className="text-sm text-[#8899a6]">@{user.userName}</div>
              
              <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold">{user.bio}</h1>
                     <Modal />
                </div>

            </div>
            {id &&
                    <button
                      onClick={handleFollow}
                      className="text-sm px-4 py-2 rounded-full border border-white"
                    >
                      <i className="fa-solid fa-user-plus"></i> Follow
                    </button>
                  }
          </div>
          <div className="mt-4 text-sm text-[#8899a6]">
            {user.bio}
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-[#8899a6]">
            <div>
              <span className="font-bold text-white">{user.following}</span> Following
            </div>
            <div>
              <span className="font-bold text-white">{user.followers}</span> Followers
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#15202b] rounded-b-2xl">
        <div className=" grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-2">
        <Post id={id} />
        </div>
      </div>
    </div>
  );
}
