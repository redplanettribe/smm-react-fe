import { useDispatch } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { AppDispatch } from "../store/store";
import RedirectIfNotLoggedIn from "../components/utility/RedirectIfNotLoggedIn";
import styled from "styled-components";
import { H1 } from "../components/design-system/Typography";
import Button from "../components/design-system/Button";
import NavBar from "../templates/NavigationBar";


const Title = styled(H1)`
    margin-bottom: 2rem;
    color: white;
`;

const TestButton = styled(Button)`
    margin-top: 2rem;
`;

const MainDashboardPage: React.FC = () => {
    const dispatch:AppDispatch = useDispatch();
    const handleGetUser = () => {
        dispatch(getUser());
    }
    return (
        <RedirectIfNotLoggedIn>
            <NavBar />
            <Title>Dashboard</Title>
            <TestButton onClick={handleGetUser}>Get User</TestButton>
        </RedirectIfNotLoggedIn>
    );
};

export default MainDashboardPage;