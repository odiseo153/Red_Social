import { Message } from "../MensajeEmergente/Mensaje";
import { Url } from "./Url";


export const GetSession = async (email: string, password: string) => {
    const data = { email, password };

    try {
        const request = await fetch(`${Url}Login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!request.ok) {
            throw new Error('Error en la solicitud de inicio de sesión');
        }

        const response = await request.json();
        console.log(response);

        if (response.error) {
            Message.errorMessage(response.error);
            return;
        }

        if (response.response && response.response.id) {
            sessionStorage.setItem("Id", response.response.id);
            sessionStorage.setItem("token", response.response.token);

            Message.successMessage("Bienvenido ");
            console.log(response.response.id);
            setTimeout(() => {
                 window.location.href = "/home";
            }, 2000);
        } else {
            Message.errorMessage('Respuesta inválida del servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        Message.errorMessage('Ocurrió un con el servidor. contacte con el servidor,');
    }
};
