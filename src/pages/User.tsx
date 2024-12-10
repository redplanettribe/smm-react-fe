import { useSelector } from "react-redux";
import { RootState } from "../store/root-reducer";

const UserPage: React.FC = () => {
    const user = useSelector((state: RootState) => state.user);
    
    return(
        <div>
            <h1>User Page</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
        </div>
    )
};

export default UserPage;