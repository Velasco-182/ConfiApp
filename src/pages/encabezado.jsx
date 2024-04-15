import React from 'react';
import {useNavigate} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";

const Header = () => {

    const navigate = useNavigate()

    const logoutUsers = () => {
        localStorage.clear()
        toast.success("Sesion cerrada")
        setTimeout(() => {
            navigate("/home")
        }, 1500)
    }

    return (

        <>
            <Toaster/>
            <header className="flex justify-between bg-blue-800 text-white py-4 px-8">
                <h1 className="text-3xl font-semibold text-center">Administrador ConfiApp</h1>

                <div className="flex items-center cursor-pointer" onClick={() => logoutUsers()}>
                    <p className="text-2xl font-semibold text-center me-5">Cerrar sesion</p>
                    <svg className="w-8" fill="#ffffff"
                         xmlns:graph="&amp;ns_graphs;" xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"
                         enable-background="new 0 0 24 24"
                         xml:space="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> <metadata> <sfw xmlns="&amp;ns_sfw;"> <slices> </slices>
                            <slicesourcebounds width="505" height="984" bottomleftorigin="true" x="0"
                                               y="-120"> </slicesourcebounds> </sfw> </metadata>
                            <g> <g> <g> <path
                                d="M15,24H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1v7c0,0.6-0.4,1-1,1s-1-0.4-1-1V2H2v20h12v-6 c0-0.6,0.4-1,1-1s1,0.4,1,1v7C16,23.6,15.6,24,15,24z"></path> </g> </g>
                                <g> <g> <path
                                    d="M23,13H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h15c0.6,0,1,0.4,1,1S23.6,13,23,13z"></path> </g> </g>
                                <g> <g> <path
                                    d="M23,13c-0.3,0-0.5-0.1-0.7-0.3l-4-4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4C23.5,12.9,23.3,13,23,13z "></path> </g> </g>
                                <g> <g> <path
                                    d="M19,17c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l4-4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-4,4C19.5,16.9,19.3,17,19,17z "></path> </g> </g> </g> </g></svg>
                </div>

            </header>
        </>


    );
};

export default Header;
