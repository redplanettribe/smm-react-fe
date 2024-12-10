import { useDispatch } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { AppDispatch } from "../store/store";

const MainDashboardPage: React.FC = () => {
    const dispatch:AppDispatch = useDispatch();
    const handleGetUser = () => {
        dispatch(getUser());
    }
    return (
        <>
            <h1>Main Dashboard</h1>
            <button onClick={handleGetUser}></button>
        </>
    );
};

export default MainDashboardPage;