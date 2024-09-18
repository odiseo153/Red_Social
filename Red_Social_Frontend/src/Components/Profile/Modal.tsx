import { useEffect, useState } from 'react';
import { useUser } from '../../Context';
import { GetUsuario, UpdateUser } from '../../Api/ApiController';
import { useParams } from 'react-router-dom';

export function Modal() {
  const [show, setShow] = useState(false);
  const { usuario } = useUser();
  const { id } = useParams();
  const [user, setUser] = useState(usuario);

  const handleShow = () => setShow(!show);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const _user = await GetUsuario(id);
        setUser(_user);
        console.log("Desde el modal", _user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handlerSubmit = async () => {
    if (user) {
      await UpdateUser(user);
      console.log(user);
      handleShow(); // Close the modal after submission
    }
  };

  return (
    <div className="App">
      <button type="button" className="text-success" onClick={handleShow}>
        <i className="text-green ml-2 accordionml-2 fa-solid fa-gear"></i>
      </button>

      <div className={`modal fade text-black ${show ? 'show d-block' : ''}`} id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Actualizar Perfil</h5>
              <button type="button" className="close" aria-label="Close" onClick={handleShow}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  value={user.userName || ''}
                  onChange={handleOnChange}
                  name="userName"
                  className="mt-2 form-control"
                  placeholder="Usuario"
                />
                <input
                  type="text"
                  value={user.email || ''}
                  onChange={handleOnChange}
                  name="email"
                  className="mt-2 form-control"
                  placeholder="Email"
                />
                <input
                  type="text"
                  value={user.imagen || ''}
                  onChange={handleOnChange}
                  name="imagen"
                  className="mt-2 form-control"
                  placeholder="Imagen"
                />
                <input
                  type="text"
                  value={user.bio || ''}
                  onChange={handleOnChange}
                  name="bio"
                  className="mt-2 form-control"
                  placeholder="Biografía"
                />
              
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleShow}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handlerSubmit}>Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>

      {show && <div className="modal-backdrop fade show" onClick={handleShow}></div>}
    </div>
  );
}
