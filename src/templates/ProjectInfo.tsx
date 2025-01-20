import { useDispatch } from "react-redux";
import { getUser } from "../store/user/userSlice";
import { AppDispatch } from "../store/store";
import styled from "styled-components";
import Button from "../components/design-system/Button";

const ContentArea = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text};
`;

const TestButton = styled(Button)`
  margin-top: 2rem;
`;

const ProjectInfo: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const handleGetUser = () => {
        dispatch(getUser());
    };

    return (
        <ContentArea>
            <Title>Project Info</Title>
            <TestButton onClick={handleGetUser}>Get User</TestButton>
        </ContentArea>
    );
};

export default ProjectInfo;