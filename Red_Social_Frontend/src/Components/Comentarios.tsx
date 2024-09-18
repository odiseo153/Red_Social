/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetPublicacion, GetComentarios, CreateComment } from '../Api/ApiController';
import { Comentario, Publicaciones } from '../Interfaces/Interfaces';
import { CreateCommentDTO } from '../DTO/CreateCommentDTO';
import { useUser } from '../Context';

export default function Comentarios() {
    const { usuario } = useUser();
    const { id } = useParams();
    const navigate = useNavigate(); // Para navegar entre rutas

    // Estados
    const [comments, setComments] = useState<Comentario[]>([]);
    const [post, setPost] = useState<Publicaciones>({
        id: "",
        comentarios: [],
        contenido: "",
        imagen: "",
        likes: 0,
        nombreUser: "",
        user: "",
        likedByUser: false,
    });
    const [comment, setComment] = useState<CreateCommentDTO>({
        content: "",
        userId: sessionStorage.getItem("Id") || "",
        postId: id || "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de loading

    const AddComment = async () => {
        if (!comment.content.trim()) return; // No enviar comentarios vacíos
        try {
            const comentario = await CreateComment(comment);
            setComments([...comments, comentario]);
            setComment({ ...comment, content: "" }); // Limpiar el input después de comentar
        } catch (error) {
            console.error("Error al agregar comentario:", error);
        }
    };

    useEffect(() => {
        const getPubli = async () => {
            setIsLoading(true); // Activar el loading al inicio
            try {
                const publicacion = await GetPublicacion(id ?? "");
                const comentarios = await GetComentarios(publicacion.id ?? "");
                setPost(publicacion);
                setComments(comentarios.$values);
                setIsLoading(false); // Desactivar loading después de cargar los datos
            } catch (error) {
                console.error("Error al obtener publicación o comentarios:", error);
                setIsLoading(false); // Desactivar loading en caso de error
            }
        };

        getPubli();
    }, [id]);

    return (
        <div className="bg-[#15202B] min-h-screen p-6">
            {/* Botón de Back */}
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)} // Regresar a la página anterior
                    className="text-white bg-transparent hover:bg-[#1d9bf0] border border-[#1d9bf0] text-sm py-1 px-4 rounded-full transition-colors"
                >
                    <i className="fa-solid fa-arrow-left"></i> Back
                </button>
            </div>

            {/* Loading Spinner */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="spinner-border text-[#1d9bf0]" role="status">
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
            ) : (
                <>
                    {/* Post Section */}
                    <div className="text-white border-b border-gray-600 p-4 flex items-start">
                        <img
                            src={post.imagen}
                            alt="Avatar"
                            className="rounded-full w-12 h-12 mr-4"
                        />
                        <div className="flex-1">
                            <div className="flex items-center">
                                <h2 className="text-lg font-semibold">{post.nombreUser}</h2>
                                <span className="text-gray-500 ml-2">@{post.nombreUser}</span>
                                <span className="text-gray-500 ml-auto">5 jun</span>
                            </div>
                            <p className="mt-2">{post.contenido}</p>
                            <div className="flex items-center mt-3 text-gray-400 space-x-4">
                                <button className="flex items-center">
                                    <i className="fa-regular fa-heart"></i>
                                    <span className="ml-1">{post.likes}</span>
                                </button>
                                <button className="flex items-center">
                                    <i className="fa-solid fa-comment"></i>
                                    <span className="ml-1">
                                        {post.comentarios.length === 0 ? 'No hay Comentarios' : ''}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Comment Input Section */}
                    <div className="mt-2 w-full p-4">
                        <h2 className="text-xl text-white font-bold mb-4">Comentar en el post</h2>
                        <div className="flex items-center mb-4">
                            <img
                                src={usuario?.imagen}
                                alt="Avatar"
                                className="rounded-full w-12 h-12 mr-4"
                            />
                            <input
                                className="bg-[#192734] flex-1 px-3 py-2 outline-none text-white rounded-lg border-2 transition-colors duration-100 focus:border-[#1d9bf0] border-gray-700"
                                name="text"
                                value={comment.content}
                                onChange={(e) => setComment({ ...comment, content: e.target.value })}
                                placeholder="Escribe tu comentario aquí..."
                                type="text"
                            />
                            <button
                                onClick={AddComment}
                                disabled={!comment.content.trim()} // Deshabilitar si está vacío
                                className="ml-2 bg-[#1d9bf0] text-white py-2 px-4 rounded-full hover:bg-[#1a8cd8] disabled:opacity-50"
                            >
                                Responder
                            </button>
                        </div>

                        {/* Comments Section */}
                        {comments.length > 0 && (
                            <div>
                                {comments.map((e) => (
                                    <div key={e.id} className="text-white p-4 border-b border-gray-600 flex items-start">
                                        <img
                                            src={e.imagen}
                                            alt="Avatar"
                                            className="rounded-full w-12 h-12 mr-4"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <h2 className="text-lg font-semibold">{e.userName}</h2>
                                                <span className="text-gray-500 ml-2">@{e.userName}</span>
                                            </div>
                                            <p className="mt-2">{e.content}</p>
                                            <div className="flex items-center mt-3 text-gray-400 space-x-4">
                                                <button className="flex items-center">
                                                    <i className="fa-regular fa-heart"></i>
                                                    <span className="ml-1">233</span>
                                                </button>
                                                <button className="flex items-center">
                                                    <i className="fa-solid fa-comment"></i>
                                                    <span className="ml-1">433</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
