import styled from "styled-components";
import ChevronDownIcon from "../../assets/icons/ChevronDown";

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background-color: ${props => props.theme.bgColors.secondary};
    border-radius: 8px;
    cursor: pointer;
`;

const ProjectName = styled.span`
    ${({ theme }) => `
        color: ${theme.textColors.primary};
    `}
`;

const ProjectSelector: React.FC = () => {
    return (
        <Container>
            <ChevronDownIcon />
            <ProjectName>Project Name</ProjectName>
        </Container>
    );
}

export default ProjectSelector;