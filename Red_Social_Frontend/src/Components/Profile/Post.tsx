import React, { useEffect, useState } from 'react';
import { GetPublicaciones } from '../../Api/ApiController';
import { Publicaciones } from '../../Interfaces/Interfaces';
import { useNavigate } from 'react-router-dom';
import { JSX } from 'react/jsx-runtime';

export default function Post({ id }: { id: string | undefined }) {
  const [posts, setPosts] = useState<Publicaciones[]>([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const navigate = useNavigate();

  useEffect(() => {
    const GetData = async () => {
      setLoading(true); // Establecer el estado de carga a true antes de obtener los datos
      try {
        const respuesta = await GetPublicaciones(false, id);
        setPosts(respuesta ?? []);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      } finally {
        setLoading(false); // Establecer el estado de carga a false después de obtener los datos
      }
    };

    GetData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="loader">Cargando...</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-lg font-semibold">No hay publicaciones</p>
        <button
          onClick={() => navigate('/home')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Ir a home
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto">
    <h1 className="text-3xl font-bold text-white">Publicaciones</h1>
  
    <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts.map((post, index) => (
        <div key={index}>
          <Card>
            <CardContent>
              <img
                src={post.imagen || '/placeholder-user.jpg'}
                alt={post.nombreUser}
                width={400}
                height={225}
                className="object-cover w-full h-40"
              />
              <div className="p-4 space-y-2">
                <div className="text-sm text-[#8899a6]">
                  <span className="font-bold text-white">{post.nombreUser}</span> @{post.nombreUser}
                </div>
                <div className="text-white">{post.contenido}</div>
                <div className="text-sm text-[#8899a6]">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  Jun 1, 2023
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  </div>
  
  );
}






function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1c2938] rounded-lg overflow-hidden">
      {children}
    </div>
  );
}

function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

function CalendarDaysIcon(props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}





