import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}
