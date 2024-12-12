import { useDispatch } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { AppDispatch } from "../store/store";
import styled from "styled-components";
import { H1 } from "../components/design-system/Typography";
import Button from "../components/design-system/Button";

const ContentArea = styled.div`
  padding: ${props => props.theme.spacing(3)};
`;

const Title = styled(H1)`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const TestButton = styled(Button)`
  margin-top: 2rem;
`;

const MainDashboardPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleGetUser = () => {
        dispatch(getUser());
    };

    return (
        <ContentArea>
            <Title>PostQueue</Title>
            <TestButton onClick={handleGetUser}>Get User</TestButton>
        </ContentArea>
    );
};

export default MainDashboardPage;