import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"

export const Login = () => {
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/");
    }
    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin} >Login</button>
            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}
