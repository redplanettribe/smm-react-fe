import styled from 'styled-components';
import ProjectSelector from './ProjectSelector';
import LogoIcon from '../../assets/icons/Logo';
import UserMenu from './UserMenu/UserMenu';

const NavContainer = styled.nav`
  ${({ theme }) => `
    background-color: ${theme.bgColors.primary};
    color: ${theme.textColors.primary};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid ${theme.dividerColor};
 `}
`;



const NavBar: React.FC = () => {
  return (
    <NavContainer>
      <LogoIcon />
      <ProjectSelector />
      <UserMenu />
    </NavContainer>
  );
};

export default NavBar;