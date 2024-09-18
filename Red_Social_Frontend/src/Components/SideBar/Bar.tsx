import React from 'react';
import Perfilito from './Perfilito';
import Completed from '../AutoCompletedBar';
import { userId } from '../../Api/ApiController';

export default function Bar({ children }: { children: React.ReactNode }) {
    const cerrarSesion = () => {
        sessionStorage.removeItem("Id");
        sessionStorage.removeItem("token");
        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    };

    return (
        <div className="flex h-screen bg-white">
            {userId && (
                <div className="flex">
                    <div className="hidden md:block w-64 h-full bg-black border-r dark:bg-gray-950 dark:border-gray-800 flex-shrink-0">
                        <div className="flex flex-col h-full">

                            <div className="flex items-center h-16 px-4 border-b dark:border-gray-800">
                                <a className="flex items-center gap-2 font-bold text-lg" href="#" rel="ugc">
                                    <img src="logo2.jpg" className="rounded-full border w-10" alt="logo" />
                                    <span className="sr-only">Calipso</span>
                                </a>
                            </div>

                            <Completed />
                            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
                                <a
                                    className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 data-[active=true]:bg-gray-100 data-[active=true]:font-medium data-[active=true]:text-gray-900 dark:data-[active=true]:bg-gray-800 dark:data-[active=true]:text-gray-50"
                                    data-active="true"
                                    href="/home"
                                    rel="ugc"
                                >
                                    <i className="fa-solid fa-house"></i>
                                    Home
                                </a>

                                <a
                                    className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                    href="/message"
                                    rel="ugc"
                                >
                                    <i className="fa-solid fa-envelope"></i>
                                    Messages
                                </a>
                                <a
                                    className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                    href="/follow"
                                    rel="ugc"
                                >
                                    <i className="fa-solid fa-user"></i>
                                    Followers
                                </a>
                                <a
                                    className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                    href="/perfil"
                                    rel="ugc"
                                >
                                    <i className="fa-solid fa-user"></i>
                                    Profile
                                </a>
                                <a
                                    className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                                    onClick={cerrarSesion}
                                    href="#"
                                    rel="ugc"
                                >
                                    <i className="fa-solid fa-right-from-bracket"></i>
                                    Logout
                                </a>
                            </nav>

                            <div className="border-t dark:border-gray-800 p-4">
                                <Perfilito />
                            </div>

                        </div>
                    </div>
                </div>
            )}

            <div className="flex-1  overflow-y-scroll h-screen ">
                <div className=" rounded-lg bg-white dark:border-gray-700 flex-grow">
                    <div className="grid  gap-4 mb-4">
                        {children}
                    </div>
                </div>
            </div>


            {userId && (
                <div className="fixed bottom-0 left-0 w-full md:hidden bg-black border-t dark:bg-gray-950 dark:border-gray-800 flex justify-around py-2">
                    <a
                        className="flex flex-col items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                        href="/home"
                        rel="ugc"
                    >
                        <i className="fa-solid fa-house"></i>
                        <span className="text-xs">Home</span>
                    </a>

                    <a
                        className="flex flex-col items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                        href="/message"
                        rel="ugc"
                    >
                        <i className="fa-solid fa-envelope"></i>
                        <span className="text-xs">Messages</span>
                    </a>
                    <a
                        className="flex flex-col items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                        href="/perfil"
                        rel="ugc"
                    >
                        <i className="fa-solid fa-user"></i>
                        <span className="text-xs">Profile</span>
                    </a>
                    <a
                        className="flex flex-col items-center text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
                        onClick={cerrarSesion}
                        href="#"
                        rel="ugc"
                    >
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="text-xs">Logout</span>
                    </a>
                </div>
            )}
        </div>
    );
}
