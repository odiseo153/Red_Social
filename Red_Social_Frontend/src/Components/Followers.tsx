 /* eslint-disable @typescript-eslint/no-unused-vars */

import { useEffect, useState } from 'react';
import { GetFollowers, UnFollowUser } from '../Api/ApiController';
import { Follow } from '../Interfaces/Interfaces';

export default function Followers() {
    const [name, setName] = useState("");
    const [cambio, setCambio] = useState(1);
    const [Followers, setFollowers] = useState<Follow>({
        following: [],
        followers: []
});

    const Datos = cambio == 1 ? Followers.following : Followers.followers;


    useEffect(() => {
        const getFollowers = async () => {
            const data = await GetFollowers();
            setFollowers(data);
            console.log(data);
        }

        getFollowers()
    }, [])

    const UnFollow = async (id: string) => {

        await UnFollowUser(id)
        if(cambio == 1){
            setFollowers({ ...Followers, following: Followers.following.filter(follow => follow.id !== id) })
        }
        if(cambio == 0){
            setFollowers({ ...Followers, following: Followers.followers.filter(follow => follow.id !== id) })
        }
    }

    const DataFiltro = () =>{
        let data = Datos;
        if(name){
            data = data.filter(follow => follow.userName.toLowerCase().includes(name.toLowerCase()))
        }

        return data;
    }

    return (
        <div className="container h-screen bg-dark mx-auto px-4 py-8 ">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Followers</h1>

                <div className="flex relative w-full  max-w-md">

                    <select className="w-auto form-select " name='.' title='selector' onChange={(e) => setCambio(Number.parseInt(e.target.value))}>
                        <option value={1}>Siguiendo</option>
                        <option value={0}>Seguidores</option>
                    </select>

                    <input
                        onChange={(e) => setName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                        placeholder="Search followers..."
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className="fa fa-search w-5 h-5 text-muted-foreground" />
                    </div>

                </div>
            </div>
            <div className="bg-muted rounded-lg">
                <div
                    dir="ltr"
                    className="relative  max-h-[400px]"
                >
                    <div
                        data-radix-scroll-area-viewport=""
                        className="h-full w-full rounded-[inherit]"
                        style={{ overflow: 'hidden scroll' }}
                    >
                        {Datos.length == 0 ?
                            <div className="text-white text-3xl">
                                No hay {cambio == 0 ? "Seguidores" : "Personas seguidas"}
                            </div>

                            :
                            <div style={{ minWidth: '100%', display: 'table' }}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                                    {DataFiltro().map((user, index) => (
                                        <div key={index} className="border bg-white rounded p-2 mt-2 d-flex align-items-center gap-3 flex-wrap">
                                        <span className="position-relative d-flex h-10 w-10 flex-shrink-0 overflow-hidden rounded-circle">
                                            <img src={user.imagen} alt="." className="d-flex h-100 w-100 align-items-center justify-content-center rounded-circle bg-muted" />
                                        </span>
                                        <div className="d-flex flex-column gap-1">
                                            <div className="fw-medium">{user.userName}</div>
                                            <a href={`/perfil/${user.userId}`} className="text-muted text-sm">@{user.userName.toLowerCase().trim()}</a>
                                        </div>
                                    
                                        <button
                                            onClick={() => UnFollow(user.id)}
                                            className="btn btn-danger ms-auto"
                                        >
                                            <i className="fa-solid fa-user-plus"></i>
                                        </button>
                                    </div>
                                    
                                    ))}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

