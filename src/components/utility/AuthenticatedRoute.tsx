import { useSelector } from "react-redux";
import { RootState } from "../../store/root-reducer";
import { Navigate } from "react-router-dom";

interface AuthenthicatedRouteProps {
    element: React.ReactNode
}

const Authenticated: React.FC<AuthenthicatedRouteProps> = ({ element }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default Authenticated;