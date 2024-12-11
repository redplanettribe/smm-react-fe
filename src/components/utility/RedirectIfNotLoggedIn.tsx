import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/root-reducer";

const RedirectIfNotLoggedIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.user.IsAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/app');
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
}

export default RedirectIfNotLoggedIn;