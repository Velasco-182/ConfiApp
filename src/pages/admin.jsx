import React, {useEffect, useState} from 'react';
import {PageTitle} from "@/widgets/layout/index.js";
import {teamData} from "@/data/index.js";
import {TeamCard} from "@/widgets/cards/index.js";
import Modal from "@/pages/modal.jsx";
import Header from '@/pages/encabezado.jsx';
import '../styles/modal.css';
import '../styles/eliminadas.css';
import '../styles/menu.css';
import '../styles/aceptadas.css';
import '../styles/verificar.css';
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";


const Admin = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);

    const [registeredUsers, setRegisteredUsers] = useState(teamData);
    const [deletedPosts, setDeletedPosts] = useState([]);
    const [showDeletedPosts, setShowDeletedPosts] = useState(false);
    const [showAcceptedPosts, setShowAcceptedPosts] = useState(false);
    const [showUserManagement, setShowUserManagement] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showPublications, setShowPublications] = useState(true);


    //noticias Pendientes
    const [noticias, setNoticias] = useState([]);
    //noticias aceptadas y Rechazadas
    const [noticiasAceptadas, setNoticiasAceptadas] = useState([]);
    const [noticiasRechazadas, setNoticiasRechazadas] = useState([]);

    const [users, setUsers] = useState([]);


    const handleShowModal = (member) => {
        setSelectedMember(member);
        setShowModal(true);
    };

    const handleAcceptUser = () => {
        const updatedUsers = registeredUsers.filter(user => user.name !== selectedMember.name);
        setRegisteredUsers(updatedUsers);
        setShowModal(false);
    };

    const handleShowDeletedPosts = () => {
        setShowDeletedPosts(true);
        setShowAcceptedPosts(false);
        setShowUserManagement(false);
        setShowPublications(false);
        // Filtrar las publicaciones eliminadas
        const deleted = registeredUsers.filter(user => user.deleted);
        setDeletedPosts(deleted);
    };

    const handleShowAcceptedPosts = () => {
        setShowAcceptedPosts(true);
        setShowDeletedPosts(false);
        setShowUserManagement(false);
        setShowPublications(false);
    };

    const handleShowUserManagement = () => {
        setShowUserManagement(true);
        setShowDeletedPosts(false);
        setShowAcceptedPosts(false);
        setShowPublications(false);
    };

    const handleShowPublications = () => {
        setShowPublications(true);
        setShowDeletedPosts(false);
        setShowAcceptedPosts(false);
        setShowUserManagement(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = registeredUsers.filter((user) =>
        user.accepted && user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDetailsModal = (post) => {
        setSelectedPost(post);
        setShowDetailsModal(true);
    };

    const closeDetailsModal = () => {
        setSelectedPost(null);
        setShowDetailsModal(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const storedUserData = localStorage.getItem("user");
            const userData = JSON.parse(storedUserData);

            const responseProfile = await axios.get("https://nuevomern-7y1b.onrender.com/api/profile", {
                headers: {
                    Authorization: userData.token
                }
            });
            const responseAllUsers = await axios.get("https://nuevomern-7y1b.onrender.com/api/usuarios/all");
            const responseNoticias = await axios.get("https://nuevomern-7y1b.onrender.com/api/noticias/pendientes");
            const responseNoticiasApro = await axios.get("https://nuevomern-7y1b.onrender.com/api/noticias");
            const responseNoticiasNoApro = await axios.get("https://nuevomern-7y1b.onrender.com/api/noticias/noaprobadas");

            console.log("Holaa")
            setUsers(responseAllUsers.data);
            setNoticias(responseNoticias.data);
            setNoticiasAceptadas(responseNoticiasApro.data);
            setNoticiasRechazadas(responseNoticiasNoApro.data);

        } catch (error) {
            console.error("Error:", error.response.data);
        }
    };

    const aceptarPublication = async (data) => {
        try {
            await axios.put(`https://nuevomern-7y1b.onrender.com/api/noticias/${data._id}/aprobar`);
            toast.success("Publicacion Aceptada")
            loadData()
            setTimeout(() => {
                handleShowAcceptedPosts()
            }, 3000);
        } catch (error) {
            toast.error("Error")
            console.error("Error:", error.response);
        }
    }
    const rechazarPublication = async (data) => {
        try {
            await axios.put(`https://nuevomern-7y1b.onrender.com/api/noticias/${data._id}/rechazar`);
            toast.success("Publicacion Rechazada")
            loadData()
            setTimeout(() => {
                handleShowDeletedPosts()
            }, 3000);

        } catch (error) {
            toast.error("Error")
            console.error("Error:", error.response);
        }
    }

    const handleDeleteUser = async (data) => {
        try {
            await axios.delete(`https://nuevomern-7y1b.onrender.com/api/usuarios/${data._id}`);
            toast.success("Usuario eliminada")
            setTimeout(() => {
                handleShowDeletedPosts()
            }, 2000);
        } catch (error) {
            toast.error("Error")
            console.error("Error:", error.response);
        }
    };

    return (
        <div
            className="flex flex-col h-screen  ">
            {/* Cambiar a flex-col para que el header y el contenido se apilen verticalmente */}
            <Header/> {/* Agrega el componente Header */}
            <Toaster/>
            <div className="flex flex-1 overflow-hidden">
                <aside className="menu bg-gray-200 w-1/5 p-4 fixed h-full ">
                    <h2 className="menu-title text-lg font-semibold mb-4">Menú Administrador</h2>
                    <ul className="space-y-2">
                        <li className="menu-item">
                            <button className="menu-button" onClick={handleShowPublications}>Publicaciones</button>
                        </li>
                        <li className="menu-item">
                            <button className="menu-button" onClick={handleShowDeletedPosts}>Publicaciones Eliminadas
                            </button>
                        </li>
                        <li className="menu-item">
                            <button className="menu-button" onClick={handleShowAcceptedPosts}>Publicaciones Aceptadas
                            </button>
                        </li>
                        <li className="menu-item flex flex-col h-screen overflow-y-auto">
                            <button className="menu-button" onClick={handleShowUserManagement}>Gestión de Usuarios
                            </button>
                        </li>

                    </ul>
                </aside>
                <section className="flex-1 p-4 ml-32 overflow-y-auto">
                    <PageTitle section="BIENVENIDO ADMINISTRADOR">
                        GESTIONA TODA LA INFORMACION NECESARIA
                    </PageTitle>
                    <div className="mt-8 grid grid-cols-1 gap-6" style={{marginLeft: "20%", width: "80%"}}>
                        {showUserManagement && users.map((dataUser) => (
                            <div key={dataUser._id}
                                 className="flex items-center bg-white rounded-lg overflow-hidden shadow-md">
                                <img
                                    src="https://img.freepik.com/psd-gratis/ilustracion-3d-avatar-o-perfil-humano_23-2150671142.jpg"
                                    alt="sin imagen aun" className="w-24 h-24 object-cover object-center"/>
                                <div className="flex-grow p-4">
                                    <h3 className="text-lg font-semibold mb-2">{dataUser.nombres} {dataUser.apellidos}</h3>
                                    <p className="text-gray-600 mb-2">{dataUser.rol}</p>
                                    <div className="flex justify-between items-center">
                                        <button
                                            onClick={() => handleShowModal(dataUser)}
                                            className="text-blue-500 hover:underline focus:outline-none"
                                        >
                                            Ver Datos
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(dataUser)}
                                            className="text-red-500 hover:underline focus:outline-none"
                                        >
                                            Eliminar este usuario
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {showDeletedPosts && (
                        <div>
                            <div>
                                <h2 className="text-lg font-semibold mb-4 text-center">Publicaciones Rechazadas</h2>
                                <div className="flex justify-center mb-4">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Buscar por nombre..."
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>

                            {noticiasRechazadas.map((data) => (
                                <div key={data._id} className="mt-8 grid grid-cols-1 gap-6 overflow-y-auto">
                                    <div
                                        className="bg-white rounded-lg overflow-hidden shadow-md publication-card flex flex-col overflow-y-auto">
                                        <div className="relative w-56">
                                            <img src={data.foto} alt="Placeholder"
                                                 className="w-full h-40 object-cover object-center"/>
                                            <div
                                                className="absolute top-0 right-0 bg-yellow-500 px-2 py-1 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 18v2a2 2 0 002 2h2a2 2 0 002-2v-2m4-10v-2a7 7 0 00-14 0v2m14 0h-4v5a3 3 0 01-3 3h-2a3 3 0 01-3-3v-5H5"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-4 w-2/3">
                                            <h3 className="text-lg font-semibold mb-2">{data.nombre}</h3>
                                            <p className="text-gray-600 mb-2">{data.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    )}

                    {showAcceptedPosts && (
                        <div>
                            <div>
                                <h2 className="text-lg font-semibold mb-4 text-center">Publicaciones Aceptadas</h2>
                                <div className="flex justify-center mb-4">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        placeholder="Buscar por nombre..."
                                        className="border border-gray-300 rounded-md px-3 py-2"
                                    />
                                </div>
                            </div>

                            {noticiasAceptadas.map((data) => (
                                <div key={data._id} className="mt-8 grid grid-cols-1 gap-6 overflow-y-auto">
                                    <div
                                        className="bg-white rounded-lg overflow-hidden shadow-md publication-card flex flex-col overflow-y-auto">
                                        <div className="relative w-56">
                                            <img src={data.foto} alt="Placeholder"
                                                 className="w-full h-40 object-cover object-center"/>
                                            <div
                                                className="absolute top-0 right-0 bg-yellow-500 px-2 py-1 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                          d="M9 18v2a2 2 0 002 2h2a2 2 0 002-2v-2m4-10v-2a7 7 0 00-14 0v2m14 0h-4v5a3 3 0 01-3 3h-2a3 3 0 01-3-3v-5H5"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-4 w-2/3">
                                            <h3 className="text-lg font-semibold mb-2">{data.nombre}</h3>
                                            <p className="text-gray-600 mb-2">{data.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                    )}

                    {showPublications && noticias.map((data) => (
                        
                        <div key={data._id} className="mt-8 grid grid-cols-1 gap-6 overflow-y-auto">
                            <div
                                className="bg-white rounded-lg overflow-hidden shadow-md publication-card flex overflow-y-auto">
                                <div className="relative w-1/3">
                                    <img src={data.foto} alt="Placeholder"
                                         className="w-full h-40 object-cover object-center"/>
                                    <div className="absolute top-0 right-0 bg-yellow-500 px-2 py-1 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 18v2a2 2 0 002 2h2a2 2 0 002-2v-2m4-10v-2a7 7 0 00-14 0v2m14 0h-4v5a3 3 0 01-3 3h-2a3 3 0 01-3-3v-5H5"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-4 w-2/3">
                                    <h3 className="text-lg font-semibold mb-2">{data.nombre}</h3>
                                    <p className="text-gray-600 mb-2">{data.descripcion}</p>
                                    <div className="flex justify-between items-center">

                                        <div>
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                                                onClick={() => aceptarPublication(data)}
                                            >
                                                Aceptar
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                                onClick={() => rechazarPublication(data)}
                                            >
                                                Rechazar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>

            {showModal && (
                <Modal
                    cerrarModal={() => setShowModal(false)}
                    data={selectedMember}
                >
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleAcceptUser}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md mr-2"
                        >Aceptar
                        </button>
                        <button
                            onClick={handleDeleteUser}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        >
                            Eliminar
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Admin;
