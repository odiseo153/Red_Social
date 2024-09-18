import { BrowserRouter as Router, Route, Routes as Rutas, Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import CalipsoPost from '../Components/Publicaciones';
import Perfil from '../Components/Perfil';
import Commentarios from '../Components/Comentarios';
import Profile from '../Components/Profile/Profile';
import Message from '../Components/Message';
import Followers from '../Components/Followers';
//import { Contexto } from '../App'
//import { Usuario } from '../Interfaces/Interfaces';


export default function Routes() {

    const id= sessionStorage.getItem("Id")
    //console.log(id)

    return ( 
        <div >

            <Router>
                <Rutas>
                {!id ? <Route path="*" element={<Navigate to="/" />} /> : null}
                    <Route path="/home" element={!id ? <Navigate to="/" /> : <CalipsoPost />} />
                    <Route path="/register" element={ <Register />} />
                    <Route path="/perfil" element={!id ? <Navigate to="/" /> :<Profile />} />
                    <Route path="/message" element={!id ? <Navigate to="/" /> :<Message />} />
                    <Route path="/follow" element={!id ? <Navigate to="/" /> :<Followers />} />
                    
                    <Route path="/perfil/:id" element={!id ? <Navigate to="/" /> :<Profile />} />
                    <Route path="/status/:id" element={!id ? <Navigate to="/" /> : <Commentarios />} />
                    <Route path="/" element={id ? <Navigate to="/home" /> : <Login />} />
 
                </Rutas>
            </Router>

        </div>
    );
}


