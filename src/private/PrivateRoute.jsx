import {Navigate} from "react-router-dom";

export const PrivateRouteAdmin = ({ children, isAuthenticated, userRole }) => {
    if (userRole === "admin") {
        return isAuthenticated ? children : <Navigate to="/home" replace />;
    } else {
        return <Navigate to="/home" replace />;
    }
};

export const PrivateRouteTutor = ({ children, isAuthenticated, userRole }) => {
    if (userRole === "tutor") {
        return isAuthenticated ? children : <Navigate to="/home" replace />;
    } else {
        return <Navigate to="/home" replace />;
    }
};

