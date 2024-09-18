import React, { MouseEventHandler, useState, useEffect, SetStateAction } from 'react';
import { GetUsuarios } from '../Api/ApiController';

function Autocomplete({ enviarMensaje,setMessage,setRecivierId }: {
    enviarMensaje: () => void, setRecivierId:  React.Dispatch<SetStateAction<string>>,
    setMessage:  React.Dispatch<SetStateAction<string>>,
}) {
    const [filteredSuggestions, setFilteredSuggestions] = useState<{ id: string, nombre: string, imagen: string }[]>([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [users, setUsers] = useState<{ id: string, nombre: string, imagen: string }[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<{ id: string, nombre: string, imagen: string } | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const Users = await GetUsuarios(); // Asegúrate de definir GetUsuarios
            setUsers(Users ?? []);
        };
        fetchUsers();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = users.filter(
            (user) =>
                user.nombre.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setActiveSuggestionIndex(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(userInput);
    };

    const onClick: MouseEventHandler<HTMLLIElement> = (e) => {
        const clickedUser = filteredSuggestions.find(
            (user) => user.nombre === e.currentTarget.innerText
        );

        if (clickedUser) {
            setUserInput(clickedUser.nombre);
            setSelectedUser(clickedUser);
            setRecivierId("")
            setRecivierId(clickedUser.id)
            console.log(clickedUser.id)
            setIsOpen(true);
        }

        setFilteredSuggestions([]);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            setUserInput(filteredSuggestions[activeSuggestionIndex].nombre);
            setSelectedUser(filteredSuggestions[activeSuggestionIndex]);
            setIsOpen(true);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        } else if (e.key === 'ArrowUp') {
            if (activeSuggestionIndex === 0) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        } else if (e.key === 'ArrowDown') {
            if (activeSuggestionIndex === filteredSuggestions.length - 1) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const SuggestionsListComponent = () => {
        return filteredSuggestions.length ? (
            <ul className="absolute bg-black border border-gray-300 w-full rounded-md mt-1 max-h-60 overflow-y-auto z-10">
                {filteredSuggestions.map((suggestion, index) => {
                    let className;
                    if (index === activeSuggestionIndex) {
                        className = 'bg-blue-500 text-white';
                    } else {
                        className = 'hover:bg-gray-200';
                    }
                    return (
                        <li
                            className={`cursor-pointer text-white p-2 flex items-center ${className}`}
                            key={suggestion.nombre}
                            onClick={onClick}
                        >
                            <img src={suggestion.imagen} alt={suggestion.nombre} className="w-6 h-6 rounded-full mr-2" />
                            {suggestion.nombre}
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="absolute bg-black border border-gray-300 w-full rounded-md mt-1 z-10 p-2">
                <em>No hay coincidencias</em>
            </div>
        );
    };

    return (
        <div className="relative">
            <input
                type="text"
                className="flex border border-input py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-8 w-full rounded-md bg-muted/50 px-3 text-sm"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
                placeholder="Buscar"
            />

            {showSuggestions && userInput && <SuggestionsListComponent />}

            {isOpen && selectedUser && (
                <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-2xl mb-4">Información del Usuario</h2>
                        <p className="mb-4">Nombre: {selectedUser.nombre}</p>
                        <img src={selectedUser.imagen} alt={selectedUser.nombre} className="w-12 h-12 rounded-full mb-4" />
                        <div className="d-flex align-items-center gap-2">

                            <input
                                className="form-control flex-1"
                                id="message"
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enviale un mensaje"
                                autoComplete="off"
                                style={{ height: '40px' }}
                            />
                            <button
                                className="btn btn-primary d-flex align-items-center justify-content-center rounded-circle p-2"
                                type="submit"
                                onClick={() => {enviarMensaje(),toggleModal()}}
                                aria-label="Send message"
                                style={{ height: '40px', width: '40px' }}
                            >
                                <i className="fas fa-paper-plane"></i>
                                <span className="visually-hidden">Send message</span>
                            </button>
                        </div>
                        <button
                            className="mt-3 bg-red-500 text-white p-2 rounded"
                            onClick={toggleModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


// Ejemplo de uso
export default function CompletedConversation(
    { enviarMensaje, setRecivierId, setMessage }:
        {
            enviarMensaje: () => void,
            setRecivierId:  React.Dispatch<SetStateAction<string>>,
            setMessage:  React.Dispatch<SetStateAction<string>>,
        }) {
    return (
        <div className="flex p-2 justify-center items-center ">
            <Autocomplete enviarMensaje={enviarMensaje} setMessage={setMessage} setRecivierId={setRecivierId}/>
        </div>
    );
}


