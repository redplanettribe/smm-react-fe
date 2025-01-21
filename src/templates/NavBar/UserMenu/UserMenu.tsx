import styled from "styled-components";
import UserIcon from "./UserIcon";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${props => props.theme.bgColors.secondary};
    border-radius: 8px;
    cursor: pointer;
`;

const UserName = styled.span`
    ${({ theme }) => `
        color: ${theme.textColors.primary};
    `}
`;

const UserMenu: React.FC = () => {
    return (
        <Container>
            <UserIcon />
            <UserName>John Doe</UserName>
        </Container>
    );
}

export default UserMenu;