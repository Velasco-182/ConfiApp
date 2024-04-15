import {Input, Checkbox, Button, Typography} from "@material-tailwind/react";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

export function SignUp() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numerodeIdentificacion: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordMatch, setPasswordMatch] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.tipoIdentificacion ||
            !formData.numerodeIdentificacion ||
            !formData.email ||
            !formData.telefono ||
            !formData.password
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        // Validar que las contraseñas coincidan
        if (formData.password !== formData.confirmPassword) {
            setPasswordMatch(false);
            toast.error("Las contraseñas no coinciden.");
            return;
        } else {
            setPasswordMatch(true);
        }

        try {
            const {confirmPassword, ...dataToSend} = formData;
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/register", dataToSend);
            console.log(response.data);
            const toastId = toast.success("Registro exitoso.");
            setFormData({
                nombres: "",
                apellidos: "",
                tipoIdentificacion: "",
                numerodeIdentificacion: "",
                email: "",
                telefono: "",
                password: "",
                confirmPassword: ""
            })
            setTimeout(() => {
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                navigate("/sign-in") // Redirigir al usuario
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al registrarse.");
        }
    };

    return (
        <section className="m-8 flex">
            <Toaster/>
            <div className="w-2/5 h-full hidden lg:block">
                <img src="/img/ado.avif" className="h-full w-full object-cover rounded-3xl"/>
            </div>
            <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">
                        Registrate
                    </Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                        Ingresa tus datos para registrarte.
                    </Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Nombres
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Pedro Ramon"
                            value={formData.nombres}
                            onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Apellidos
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Perez Perez"
                            value={formData.apellidos}
                            onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <br/>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Tipo de identificación
                        </Typography>
                        <select
                            size="lg"
                            placeholder="Selecciona tu tipo de identificación"
                            value={formData.tipoIdentificacion}
                            onChange={(e) => setFormData({...formData, tipoIdentificacion: e.target.value})}
                            className="border-t border-blue-gray-200 focus:border-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        >
                            <option value="" color="gray">
                                Selecciona tu tipo de identificación
                            </option>
                            <option value="cedula de ciudadania">Cedula de Ciudadanía</option>
                            <option value="cedula de extrangeria">Cedula de extrangería</option>
                        </select>
                    </div>
                    <br/>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Número de identificación
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="Debes ser mayor de edad"
                            value={formData.numerodeIdentificacion}
                            onChange={(e) => setFormData({...formData, numerodeIdentificacion: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Tu correo electronico
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Número de telefono/celular
                        </Typography>
                        <Input
                            type="number"
                            size="lg"
                            placeholder="300-456-7890"
                            value={formData.telefono}
                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Escribe tu contraseña
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                    </div>
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
                            Confirma tu contraseña
                        </Typography>
                        <Input
                            size="lg"
                            type="password"
                            placeholder="********"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={` !border-t-blue-gray-200 focus:!border-t-gray-900 ${
                                !passwordMatch ? "border-red-500" : ""
                            }`}
                            labelProps={{className: "before:content-none after:content-none"}}
                        />
                        {!passwordMatch && (
                            <Typography variant="small" color="red">
                                Las contraseñas no coinciden.
                            </Typography>
                        )}
                    </div>
                    <Checkbox
                        label={
                            <Typography variant="small" color="gray"
                                        className="flex items-center justify-start font-medium">
                                Acepta&nbsp;
                                <a href="#"
                                   className="font-normal text-black transition-colors hover:text-gray-900 underline">
                                    Terminos y condiciones
                                </a>
                            </Typography>
                        }
                        containerProps={{className: "-ml-2.5"}}
                    />
                    <Button type="submit" className="mt-6" fullWidth>
                        Registrate ahora
                    </Button>


                    <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
                        Ya tienes cuenta?
                        <Link to="/sign-in" className="text-gray-900 ml-1">Inicia sesión</Link>
                    </Typography>
                </form>

            </div>
        </section>
    );
}

export default SignUp;
