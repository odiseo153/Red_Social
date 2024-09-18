import { useState } from "react";
import { GetSession } from "../Api/AuthController.ts";
import { LoadingLogin } from "../Components/Loading";





export default function Login() {
    const [email, setEmail] = useState("nolan@gmail.com");
    const [password, setPassword] = useState("12345");
    const [loading, setLoading] = useState(false);

    const IniciarSesion = async () => {
        setLoading(true);
        GetSession(email, password)
            .then(() => {
                setLoading(false);
            });
    };

    return (
        <div className="mt-4 flex items-center justify-center">
            <div className="bg-gray-900 border-[4px] border-blue-900 rounded-2xl hover:border-blue-500 transition-all duration-200 w-96">
                <form className="py-16 px-12 text-center text-white">
                    {loading ? (
                        <LoadingLogin />
                    ) : (
                        <div className="flex items-center">
                            <img src="logo2.jpg" className="rounded-full w-12 border mr-4" alt="logo" />
                            <h1 className="text-2xl font-semibold"> Calipso</h1>
                        </div>
                    )}

                    <input
                        className="mt-4 w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200 mb-4"
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200 mb-4"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                    />
                    <button
                        onClick={IniciarSesion}
                        className="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                        type="button"
                    >
                        Sign in
                    </button>
                    <p className="mt-4 text-gray-300">
                        Don't have an account?
                        <a
                            className="font-semibold text-white hover:text-blue-500 transition-all duration-200 ml-1"
                            href="/register"
                        >
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}