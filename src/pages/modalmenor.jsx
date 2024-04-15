import React from 'react';
import { Typography, Button } from "@material-tailwind/react"; // Asegúrate de importar los componentes necesarios de Material Tailwind

const ModalMenor = ({ onClose, childInfo }) => {
    const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo } = childInfo;

    return (
        <div className="modal">
            <div className="modal-content">
                <Typography variant="h5" color="blue-gray">
                    Información del menor
                </Typography>
                <div>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Nombre: {nombres}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Apellido: {apellidos}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Tipo de identificación: {tipoIdentificacion}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Número de identificación: {numeroIdentificacion}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Edad: {edad}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Teléfono: {telefono}
                    </Typography>
                    <Typography variant="paragraph" className="font-normal" color="gray">
                        Correo electrónico: {correo}
                    </Typography>
                </div>
                <Button onClick={onClose} color="blue-gray" ripple="light">
                    Cerrar
                </Button>
            </div>
        </div>
    );
};

export default ModalMenor;