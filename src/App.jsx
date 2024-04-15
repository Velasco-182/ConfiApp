import {Routes, Route, Navigate, useLocation} from "react-router-dom";
import {Navbar} from "@/widgets/layout";
import routes from "@/routes";
import {Profile, SignIn, SignUp} from "./pages";
import Admin from "@/pages/admin.jsx";
import {PrivateRouteAdmin, PrivateRouteTutor} from "./private/PrivateRoute.jsx";

function App() {
    const {pathname} = useLocation();
    const storedUserData = localStorage.getItem("user");
    const userData = storedUserData ? JSON.parse(storedUserData) : null;

    const isAuthenticated = userData !== null;

    return (
        <>
            {/* Mostrar Navbar solo si no está en las páginas de inicio de sesión */}
            {!(

                pathname === "/sign-in" ||
                pathname === "/sign-up" ||
                pathname === "/profile" ||
                pathname === "/admin"
            ) && (
                <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
                    <Navbar routes={routes}/>
                </div>
            )}

            <Routes>
                {routes.map(({path, element}, key) => (
                    <Route key={key} exact path={path} element={element}/>
                ))}
                
                <Route
                    path="/profile"
                    element={
                        <PrivateRouteTutor isAuthenticated={isAuthenticated} userRole={userData && userData.rol ? userData.rol : ''} >
                            <Profile/>
                        </PrivateRouteTutor>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <PrivateRouteAdmin isAuthenticated={isAuthenticated} userRole={userData && userData.rol ? userData.rol : ''}>
                            <Admin/>
                        </PrivateRouteAdmin>
                    }
                />
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="*" element={<Navigate to="/home" replace/>}/>

               

            </Routes>
        </>
    );
}

export default App;
