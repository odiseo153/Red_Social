import  { useState } from 'react';
import { RegisterUser } from '../Api/ApiController';

export default function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [imagen, setImagen] = useState('');


    const handleSubmit = () => {
        RegisterUser(userName,email,password,phone,imagen)
        setUserName("")
        setEmail("")
        setPassword("")
        setPhone("")
        setImagen("")
    };

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200">
                    <form
                        className="mx-auto flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col"
                        onSubmit={e => e.preventDefault()}
                    >
                        <h1 className="text-white text-2xl">Register</h1>
                        <input
                            className="text-white w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Nombre De usuario"
                            type="text"
                            name="userName"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <input
                            className="text-white w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="text-white w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            className="text-white w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Numero de Telefono"
                            type="number"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                         <input
                            className="text-white w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                            placeholder="Imagen Url"
                            type="text"
                            name="image"
                            value={imagen}
                            onChange={(e) => setImagen(e.target.value)}
                        />
                        <input
                        onClick={handleSubmit}
                            className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                            type="submit"
                        />
                        <p>
                            have an account?
                            <a
                                className="font-semibold text-white hover:text-blue-500 transition-all duration-200"
                                href="/"
                            >Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
