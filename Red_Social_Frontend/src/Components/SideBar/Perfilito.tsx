import {  useState } from "react";
import { useUser } from "../../Context";


export default function Perfilito() {
    const { usuario } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div>
            <div>
                <div onClick={toggleDropdown} className="text-white mr-3 mt-3 flex items-start cursor-pointer duration-300 p-2  hover:mt-1 hover:scale-105">
                    <img
                        src={usuario?.imagen}
                        alt="Avatar"
                        className="rounded-full w-12 h-12 mr-4"
                    />
                    <div className="flex-1">
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold">{usuario?.userName}</h2>
                        </div>

                        <p className="mt-2 ">
                            @{usuario?.userName}
                        </p>
                    </div>
                </div>
            </div>


        </div>
    )
} 