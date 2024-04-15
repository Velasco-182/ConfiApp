import {Input, Avatar, Typography, Button, Card, Textarea, Checkbox} from "@material-tailwind/react";
import {
    MapPinIcon, BriefcaseIcon, BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import {Footer, DesaparecidosUpload} from "@/widgets/layout";
import {contactData} from "@/data";
import {PageTitle} from "@/widgets/layout";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import React, {useEffect, useState} from "react";
import News from "@/widgets/layout/News.jsx";
import ModalMenor from "@/pages/modalmenor";
import '../styles/modalmenor.css';
import {useNavigate} from "react-router-dom";


export function Profile() {

    const navigate = useNavigate()

    const [showChildModal, setShowChildModal] = useState(false);
    const [selectedChild, setSelectedChild] = useState({});// Nuevo estado para controlar el modal del menor

    const openChildModal = (menor) => {
        setSelectedChild(menor);
        setShowChildModal(true);
    };

    const dataUsers = localStorage.getItem("user");
    let idTutor = {};

    if (dataUsers !== null && dataUsers !== undefined) {
        idTutor = JSON.parse(dataUsers);
    } else {
        console.error("No se encontró la información del usuario en el almacenamiento local.");
    }

    const [data, setData] = useState({})
    const [menores, setMenores] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);
    const [showModalDes, setShowModalDes] = useState(false);
    const [formData, setFormData] = useState({
        nombres: "",
        apellidos: "",
        tipoIdentificacion: "",
        numeroIdentificacion: "",
        edad: "",
        telefono: "",
        correo: "",
        idTutor: idTutor.id
    });

    const closeChildModal = () => {
        setShowChildModal(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.nombres ||
            !formData.apellidos ||
            !formData.tipoIdentificacion ||
            !formData.numeroIdentificacion ||
            !formData.edad ||
            !formData.telefono ||
            !formData.correo
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/menor", formData);
            console.log(response.data);

            const toastId = toast.success("Registro menor exitoso.");
            setTimeout(() => {
                setFormData({
                    nombres: "",
                    apellidos: "",
                    tipoIdentificacion: "",
                    numeroIdentificacion: "",
                    edad: "",
                    telefono: "",
                    correo: "",
                    idTutor: ""
                })
                toast.dismiss(toastId); // Ocultar el toast después de 3 segundos
                setShowModal(false)
                loadDataUser()
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el registro.");
        }

    };

    useEffect(() => {
        loadDataUser()
    }, []);

    const loadDataUser = async () => {
        try {
            const storedUserData = localStorage.getItem("user");
            const userData = JSON.parse(storedUserData);

            const response = await axios.get("https://nuevomern-7y1b.onrender.com/api/profile", {
                headers: {
                    Authorization: userData.token
                }
            });

            const responseMinMenores = await axios.get(`https://nuevomern-7y1b.onrender.com/api/menores/${idTutor.id}`);
            setMenores(responseMinMenores.data);
            setData(response.data);

        } catch (error) {
            console.error("Error:", error.response.data);
        }
    }


    //_-_----------------


    // Definimos las opciones del menú
    const menuOptions = [
        {label: ' Ver reportes', action: () => setShowModalDes(true)},
        {label: ' Cerrar sesion', action: () => logoutUsers()}
    ];

// Estado para controlar la visibilidad del menú desplegable
    const [menuOpen, setMenuOpen] = useState(false);

// Función para manejar el clic en el ícono del menú
    const handleMenuClick = () => {
        setMenuOpen(!menuOpen); // Cambiamos el estado para mostrar u ocultar el menú
    };

// Función para manejar las acciones del menú
    const handleMenuOptionClick = (action) => {
        action(); // Ejecutamos la acción asociada a la opción del menú
        setMenuOpen(false); // Ocultamos el menú después de hacer clic en una opción
    };

    const [dataDes, setDataDes] = useState({
        nombre: "",
        foto: "",
        descripcion: "",
        aceptaTerminos: false // Nuevo estado para el checkbox
    });

    const handleSubmitDes = async () => {

        if (
            !dataDes.nombre ||
            !dataDes.foto ||
            !dataDes.descripcion ||
            !dataDes.aceptaTerminos // Verificamos que el usuario haya aceptado los términos
        ) {
            toast.error("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await axios.post("https://nuevomern-7y1b.onrender.com/api/noticias", dataDes);
            console.log(response.data);
            const toastId = toast.success("Tu publicación está en proceso de revisión por el administrador.");
            setTimeout(() => {
                toast.dismiss(toastId);
                setShowModalReport(false)
                setDataDes({
                    nombre: "",
                    foto: "",
                    descripcion: "",
                    aceptaTerminos: false // Restablecemos el estado del checkbox
                })
            }, 2000);

        } catch (error) {
            console.error("Error:", error);
            toast.error("Error en el reporte.");
        }

    };

    const logoutUsers = () => {
        localStorage.clear()
        toast.success("Sesion cerrada")
        setTimeout(() => {
            navigate("/home")
        }, 1500)
    }


    return (
        <>

            <section className="relative block h-[50vh]">
                <Toaster/>
                <div
                    className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-fin.png')] bg-cover bg-center scale-100"/>
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center"/>

                {/* Botón del menú */}
                <span
                    className="bg-[#7ED2F3] rounded-md p-2.5 cursor-pointer hover:bg-blue-00 transition-colors duration-300 absolute top-4 right-4 z-50"
                    style={{width: "50px", height: "50px"}}
                    onClick={() => handleMenuClick()}
                >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-black"
        viewBox="0 0 20 20"
        fill="currentColor"
    >
      <path
          fillRule="evenodd"
          d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1z"
          clipRule="evenodd"
      />
    </svg>
  </span>

                {/* Menú desplegable */}
                {menuOpen && (
                    <div className="absolute top-10 right-10 bg-white shadow-md rounded-md">
                        {menuOptions.map((option, index) => (
                            <div
                                key={index}
                                className="p-3 hover:bg-[#4D5AA6]  text-[#000000] cursor-pointer"

                                onClick={() => handleMenuOptionClick(option.action)}>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}

            </section>

            <section className="relative bg-white py-16">
                <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-white">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row justify-between">
                            <div className="relative flex gap-6 items-start">

                                <div className="-mt-20 w-40">
                                    <Avatar
                                        src="/img/perfil2.png"
                                        alt="Profile picture"
                                        variant="circular"
                                        className="h-full w-full"
                                    />
                                </div>
                                <div className="flex flex-col mt-2">
                                    <Typography variant="h4" color="blue-gray">
                                        {data.nombres} {data.apellidos}
                                    </Typography>
                                    <Typography variant="paragraph" color="gray"
                                                className="!mt-0 font-normal">{data.email}</Typography>

                                    <div className="flex items-center gap-2">
                                        <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500"/>
                                        <Typography className="font-medium text-blue-gray-500">
                                            Tel: {data.telefono}
                                        </Typography>

                                    </div>
                                </div>


                            </div>


                            <div className="mt-8 mb-10 flex justify-center gap-4">
                                <Button
                                    style={{background: "#7ED2F3", color: "#000000"}}
                                    type="button"
                                    onClick={() => setShowModal(true)}>
                                    Agregar un menor
                                </Button>
                        

                                <Button
                                    style={{background: "#7ED2F3", color: "#000000"}}
                                    type="button"
                                    onClick={() => setShowModalReport(true)}
                                >
                                    Reportar un menor desaparecido
                                </Button>

                                



                                <div className="mr-200 p-3 text-center -ml-4">


                                    {showChildModal && (
                                        <ModalMenor
                                            onClose={closeChildModal}
                                            childInfo={selectedChild}
                                        />
                                    )}


                                </div>


                                <div className="mr-4 p-3 text-center">

                                </div>
                                {/* <div className="p-3 text-center lg:mr-4">
                                                    <Typography
                                                        variant="lead"
                                                        color="blue-gray"
                                                        className="font-bold uppercase">
                                                        10
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-blue-gray-500">
                                                        Rutas realizadas
                                                    </Typography>
                                                </div> */}
                            </div>

                        </div>
                    </div>
                    <div className="-mt-4 container space-y-2">
                        {/* <div className="flex items-center gap-2">
                                <BuildingLibraryIcon className="-mt-px h-4 w-4 text-blue-gray-500"/>
                                <Typography className="font-medium text-blue-gray-500">
                                    Tel: {data.telefono}
                                </Typography>
                            </div> */}


                    </div>


                    <div className="container mx-auto mt-8">
                        <div className="  bg-blue-100 px-4 py-6 rounded-lg shadow-md ">
                            <Typography
                                variant="lead"
                                color="blueGray"
                                className="font-bold text-sm uppercase mb-4">
                                Menores a Cargo
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {menores.map((menor) => (
                                    <div key={menor._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <Typography className="font-bold text-blueGray-700">
                                            {menor.nombres} {menor.apellidos}
                                        </Typography>
                                        <Typography className="text-blueGray-500">
                                            {menor.edad} años
                                        </Typography>

                                        <button
                                            className="text-[#4D5AA6] font-semibold hover:underline focus:outline-none focus:text-blue-600 transition duration-200"
                                            onClick={() => openChildModal(menor)}>
                                            Ver Detalles
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mb-10 py-6">

                    </div>

                </div>

            </section>


            <div className="bg-white">
                <Footer/>
            </div>


            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleSubmit}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Typography variant="h5" className="font-bold mb-4">
                                        Registro Menor
                                    </Typography>

                                    <div className="grid grid-cols-1 gap-3">

                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Nombres:
                                        </Typography>
                                        <Input
                                            type="text"
                                            size="regular"
                                            placeholder="Nombres"
                                            value={formData.nombres}
                                            onChange={(e) => setFormData({...formData, nombres: e.target.value})}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Apellidos:
                                        </Typography>
                                        <Input
                                            type="text"
                                            size="regular"
                                            placeholder="Apellidos"
                                            value={formData.apellidos}
                                            onChange={(e) => setFormData({...formData, apellidos: e.target.value})}
                                        />

                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Tipo de identificación:
                                        </Typography>
                                        <select
                                            value={formData.tipoIdentificacion}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                tipoIdentificacion: e.target.value
                                            })}
                                            className="border-t border-blue-gray-200 focus:border-gray-900 px-4 py-2 rounded-md"
                                        >
                                            <option value="">
                                                Selecciona tu tipo de identificación:
                                            </option>
                                            <option value="tarjeta de identidad">Tarjeta de identidad</option>
                                            <option value="registro">Registro</option>
                                        </select>
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Número de identificación:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Número de identificación"
                                            value={formData.numeroIdentificacion}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                numeroIdentificacion: e.target.value
                                            })}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Edad:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Edad"
                                            value={formData.edad}
                                            onChange={(e) => setFormData({...formData, edad: e.target.value})}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Teléfono:
                                        </Typography>
                                        <Input
                                            type="number"
                                            size="regular"
                                            placeholder="Teléfono"
                                            value={formData.telefono}
                                            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                                        />
                                        <Typography variant="small" color="blue-gray" className="-mb-4 font-medium">
                                            Correo electrónico:
                                        </Typography>
                                        <Input
                                            type="email"
                                            size="regular"
                                            placeholder="Correo electrónico"
                                            value={formData.correo}
                                            onChange={(e) => setFormData({...formData, correo: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button
                                        style={{background: "#7ED2F3", color: "#000000"}}
                                        type="submit"
                                        color="blue"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Registrar menor
                                    </Button>
                                    <Button
                                        color="gray"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModal(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {showModalReport && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div
                        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                              aria-hidden="true">&#8203;</span>
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Typography variant="h5" className="font-bold mb-4">
                                        Reportar Menor Desaparecido
                                    </Typography>
                                    <div>

                                        <div className="my-4 flex gap-8">
                                            <Input
                                                variant="outlined" size="sm"
                                                label="Nombre completo del menor"
                                                value={dataDes.nombre}
                                                onChange={(e) => setDataDes({...dataDes, nombre: e.target.value})}/>
                                        </div>

                                        <div className="my-4 flex gap-8">
                                            <Input type="text" name="foto" variant="outlined" size="sm"
                                                   label="Foto del menor"
                                                   value={dataDes.foto}
                                                   onChange={(e) => setDataDes({
                                                       ...dataDes,
                                                       foto: e.target.value
                                                   })}/>
                                        </div>

                                        <Textarea variant="outlined" size="sm"
                                                  label="Descripcion y donde fue visto por última vez. (También agrega un número de contacto)"
                                                  rows={5}
                                                  value={dataDes.descripcion}
                                                  onChange={(e) => setDataDes({
                                                      ...dataDes,
                                                      descripcion: e.target.value
                                                  })}/>

                                        {/* Agregamos el campo de Checkbox */}
                                        <div className="mt-0 flex items-center gap-1">
                                            <Checkbox
                                                checked={dataDes.aceptaTerminos}
                                                onChange={(e) => setDataDes({
                                                    ...dataDes,
                                                    aceptaTerminos: e.target.checked
                                                })}
                                            />
                                            <Typography
                                                variant="small"
                                                color="gray"
                                                className="flex items-center justify-start font-medium"
                                            >
                                                Aceptas &nbsp;
                                                <a
                                                    href="#"
                                                    className="font-normal text-black transition-colors hover:text-gray-900 underline"
                                                >
                                                    Términos y condiciones
                                                </a>
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <Button
                                        style={{background: "#7ED2F3", color: "#000000"}}
                                        type="button"
                                        color="blue"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        onClick={() => handleSubmitDes()}
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                                        Enviar reporte
                                    </Button>
                                    <Button
                                        color="gray"
                                        buttonType="filled"
                                        size="regular"
                                        block={false}
                                        iconOnly={false}
                                        ripple="light"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setShowModalReport(false)}>
                                        Cancelar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModalDes && (
                <div className="modal">
                    <div className="flex flex-col items-center modal-contenido w-full h-full">
                        <div className="flex flex-col items-center">
                            <News/>
                            <Button className="w-full my-5" onClick={() => setShowModalDes(false)} color="blue-gray"
                                    ripple="light">
                                Cerrar
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
};

export default Profile;
