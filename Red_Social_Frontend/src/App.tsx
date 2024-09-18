// App.tsx
import React from 'react';
import './App.css';
import Routes from './Routes/Routes';
import Bar from './Components/SideBar/Bar';
import { UserProvider } from './Context';
//import { Todo } from './Components/Message';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Bar>
        <Routes />
      </Bar>
    </UserProvider>
  );
};


export default App;




