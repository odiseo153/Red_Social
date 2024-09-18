import React, { useState } from 'react';
//import Tendencias from './Tendencias';
import Completed from '../AutoCompletedBar';
import Perfilito from './Perfilito';
import Publicar from './ChatComponent';
import { useUser } from '../../Context';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { usuario } = useUser();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const rutas = [
    {
      "nombre": "Inicio",
      "ruta": "/home",
      "icon": "fa-solid fa-house",
    },
    {
      "nombre": "Perfil",
      "ruta": "/perfil",
      "icon": "fa-solid fa-user",
    },
  ];



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {usuario && (
        <div>
          <button
            onClick={toggleSidebar}
            aria-controls="default-sidebar"
            type="button"
            className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-800 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              />
            </svg>
          </button>

          <aside
            id="default-sidebar"
            className={`text-white rounded-3 fixed top-0 left-0 z-40 w-64  h-screen transition-transform transform   ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } sm:translate-x-0`}
            aria-label="Sidebar"
          >
            <div className="h-full px-3 py-4 overflow-y-auto">

              <Completed />

              <ul className="mt-3 space-y-2 font-medium">

                {rutas.map((e, i) => (
                  <li key={i}>
                    <a
                      href={e.ruta}
                      className="rounded-full flex items-center p-2 hover:text-black  dark:text-white duration-300 hover:bg-gray-100 hover:p-2 dark:hover:bg-white group"
                    >
                      <i className={e.icon}></i>
                      <span className="flex-1 ms-3 whitespace-nowrap">{e.nombre}</span>
                    </a>
                  </li>
                ))}


              </ul>

              <Publicar />

              <Perfilito />
            </div>



          </aside>




        </div>
      )}

      {/* Contenido principal */}
      <div className={` w-screen  justify-center items-center p-4 sm:ml-64  `}>
        <div className={`  border-gray-200  rounded-lg dark:border-gray-700 ${usuario == null ? '' : 'border-2'} flex-grow`}>
          <div className="md:grid-cols-3 gap-4 mb-4 justify-center items-center">
            {children}
          </div>
        </div>
      </div>



    </div>
  );
}