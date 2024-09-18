import React, { MouseEventHandler, useState, useEffect } from 'react';
import { GetUsuarios } from '../Api/ApiController';

const Autocomplete = () => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<{ id:string, nombre: string, imagen: string }[]>([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [users, setUsers] = useState<{ id:string,nombre: string, imagen: string }[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const Users = await GetUsuarios();
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
    }

    setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);


  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      setUserInput(filteredSuggestions[activeSuggestionIndex].nombre);
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

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <ul className="absolute bg-black border border-gray-300 w-full rounded-md mt-1 max-h-60 overflow-y-auto z-10">
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          if (index === activeSuggestionIndex) {
            className = 'bg-blue-500 text-white';
          } else {
            className = 'hover:bg-blue-500';
          }
          return (
            <li
              className={`cursor-pointer text-white p-2 flex items-center ${className}`}
              key={suggestion.nombre}
              onClick={onClick}
            >
              <a className="flex" href={`/perfil/${suggestion.id}`}>
              <img src={suggestion.imagen} alt={suggestion.nombre} className="w-6  h-6 rounded-full mr-2" />
              {suggestion.nombre}
              </a>
              
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="absolute text-white bg-white border border-gray-300 w-full rounded-md mt-1 z-10 p-2">
        <em>No hay coincidencias</em>
      </div>
    );
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        className="w-full border border-gray-300 p-2 rounded-md"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={userInput}
        placeholder="Buscar"
      />
      {showSuggestions && userInput && <SuggestionsListComponent />}
    </div>
  );
};

// Ejemplo de uso
const Completed = () => {
  return (
    <div className="flex p-2 justify-center items-center ">
      <Autocomplete />
    </div>
  );
};

export default Completed;
