import {Home, Profile, SignIn, SignUp} from "@/pages";

export const routes = [
    {
        name: "Inicio",
        path: "/home",
        element: <Home/>,
    },
    {
        name: "Nosotros",
        href: "#nosotros",
        element: "",
    },
];

export default routes;
