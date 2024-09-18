// UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GetUsuario } from './Api/ApiController';
import { Usuario } from './Interfaces/Interfaces';

interface UserContextType {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario>({
    id: "",
    userName: "User",
    email: "User@gmail.com",
    imagen: "",
    posts: 2,
    followers: 1,
    following: 5,
    bio: ""
  });

  const userId = sessionStorage.getItem("Id");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await GetUsuario();
        if (fetchedUser) {
          setUsuario(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
