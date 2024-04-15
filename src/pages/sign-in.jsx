import React, { useState } from 'react';
import {
    Input, Checkbox, Button, Typography, Modal,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [openModal, setOpenModal] = useState(false); // Estado para controlar la visibilidad del modal

    const loginUser = async () => {
        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/login", {
                email,
                password,
            });

            console.log(response.data);

            const userData = JSON.stringify(response.data);
            localStorage.setItem("user", userData);

            const toastId = toast.success(`Bienvenido ${response.data.nombres}`);
            setTimeout(() => {
                toast.dismiss(toastId);
                if (response.data.rol === "tutor") {
                    navigate("/profile");
                } else if (response.data.rol === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/home");
                }
            }, 2000);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error("Error:", error.response.data);
        }
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <section className="m-8 flex gap-4">
            <img src="/img/logopngconfiazul.png" alt="Logo" className="top-0 left-0 w-16 h-16 m-4" />
            <Toaster />
            <div className="w-full lg:w-3/5 mt-24">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Iniciar Sesión</Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Email</Typography>
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            size="lg"
                            placeholder="name@mail.com"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">Contraseña</Typography>
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            size="lg"
                            placeholder="********"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <Checkbox
                        label={
                            <Typography variant="small" color="gray" className="flex items-center justify-start font-medium">
                                Aceptas &nbsp;
                                <a
                                    href="#"
                                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                                    onClick={handleOpenModal} // Manejador para abrir el modal
                                >
                                    Términos y condiciones
                                </a>
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <Button onClick={() => loginUser()} className="mt-6" fullWidth style={{ background: "#7ED2F3", color: "#000000" }}>Iniciar Sesión</Button>
                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        ¿No estás registrado?
                        <Link to="/sign-up" className="text-gray-900 ml-1">Crea una cuenta</Link>
                    </Typography>
                </form>
            </div>
            <div className="w-2/5 h-full hidden lg:block">
                <img src="/img/inicio.jpg" className="h-full w-full object-cover rounded-3xl" alt="Inicio" />
            </div>

            {/* Modal */}
            {openModal &&
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseModal}></div>
                    <div className="bg-white p-8 rounded-md z-10">
                        <Typography variant="h4" className="mb-4">Términos y condiciones</Typography>
                        <Typography variant="body">Confiapp gestiona este sitio web. En todo el sitio, 
                        <p>los términos "nosotros", "nos" y "nuestro" se refieren en lo sucesivo a Confiapp.</p>
                        <p>Confiapp ofrece esta página web, incluida toda la información, las herramientas y</p>
                        <p>los servicios que se ponen en este sitio a disposición suya, el usuario, siempre</p>
                        <p>y cuando acepte la totalidad de los términos, condiciones, políticas y avisos </p>
                        <p>contemplados aquí.</p>
                        
                        <p>Al aceptar los presentes Términos del servicio, usted declara que tiene la mayoría </p>
                        <p> de edad en su estado o provincia de residencia, o que es mayor de edad en su estado</p>
                        <p> o provincia de residencia y que nos ha dado su consentimiento para permitir que </p>
                        <p>cualquiera de las personas menores que dependen de usted utilice este sitio.</p>
                        <p>No puede utilizar nuestros productos para ningún fin ilegal o no autorizado </p>
                        <p>ni puede, al hacer uso del Servicio, infringir las leyes de su jurisdicción</p>
                        <p>(incluyendo de manera enunciativa más no limitativa, las leyes de derechos de autor).</p>
                        <p>No transmitirá ningún gusano o virus informáticos ni ningún código de naturaleza </p>
                        <p>destructiva.</p></Typography>
                        <Button onClick={handleCloseModal} className="mt-4" color="blue">Aceptar</Button>
                    </div>
                </div>
            }
        </section>
    );
}

export default SignIn;