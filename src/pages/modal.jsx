import React, { useEffect, useState } from 'react';
import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import ModalMenor from "@/pages/modalmenor.jsx";

const Modal = ({ data, cerrarModal }) => {
    const [menores, setMenores] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [showChildModal, setShowChildModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState({});

    const openChildModal = (menor) => {
        setSelectedChild(menor);
        setShowChildModal(true);
    };

    const closeChildModal = () => {
        setShowChildModal(false);
        setSelectedChild({});
    };

    useEffect(() => {
        loadMenores();
    }, []);

    const loadMenores = async () => {
        try {
            const responseMinMenores = await axios.get(`https://nuevomern-7y1b.onrender.com/api/menores/${data._id}`);
            setMenores(responseMinMenores.data);
        } catch (error) {
            console.error("Error:", error.response.data);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="modal">
            <div className="flex flex-col justify-center modal-contenido w-5/12">
                <div className="overflow-y-auto">
                    <img
                        className="w-full h-48"
                        src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg"
                        alt={data.data}
                        style={{ maxWidth: '200px' }}
                    />
                    <h2>
                        <span className="font-bold my-1">Nombre: </span>
                        {data.nombres} {data.apellidos}
                    </h2>
                    <p>
                        <span className="font-bold my-1">Rol: </span>
                        {data.rol}
                    </p>
                    <p>
                        <span className="font-bold my-1">Telefono: </span>
                        {data.telefono}
                    </p>
                    <p>
                        <span className="font-bold my-1">Correo: </span>
                        {data.email}
                    </p>
                    <p className="font-bold my-1">{data.tipoIdentificacion}</p>
                    <p>
                        <span className="font-bold my-1">Identificacion: </span>
                        {data.numerodeIdentificacion}
                    </p>

                    <p className="font-bold my-2">Menores a cargo</p>
                    {!cargando && (
                        <div className="overflow-y-auto max-h-64">
                            {menores.length > 0 ? (
                                menores.map((menor) => (
                                    <div key={menor._id} className="bg-gray-100 p-4 rounded-lg shadow-md my-2">
                                        <Typography className="font-bold text-blueGray-700">
                                            {menor.nombres} {menor.apellidos}
                                        </Typography>
                                        <Typography className="text-blueGray-500">
                                            {menor.edad} años
                                        </Typography>

                                        <button
                                            className="text-[#4D5AA6] font-semibold hover:underline focus:outline-none focus:text-blue-600 transition duration-200"
                                            onClick={() => openChildModal(menor)}
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">Sin menores a cargo</p>
                            )}
                        </div>
                    )}

                    <button onClick={cerrarModal} className="modal-cerrar w-full">
                        Cerrar
                    </button>
                    {showChildModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <Typography variant="h5" color="blue-gray">
                                    Información del menor
                                </Typography>
                                <div>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Nombre: {selectedChild.nombres}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Apellido: {selectedChild.apellidos}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Tipo de identificación: {selectedChild.tipoIdentificacion}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Número de identificación: {selectedChild.numeroIdentificacion}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Edad: {selectedChild.edad}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Teléfono: {selectedChild.telefono}
                                    </Typography>
                                    <Typography variant="paragraph" className="font-normal" color="gray">
                                        Correo electrónico: {selectedChild.correo}
                                    </Typography>
                                </div>
                                <Button onClick={closeChildModal} color="blue-gray" ripple="light">
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;