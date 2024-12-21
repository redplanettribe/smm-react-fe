import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/root-reducer';
import { logout } from '../store/user/userSlice';
import { AppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { Text3 } from '../components/design-system/Typography';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${props => props.theme.spacing(8)}; // 64px
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${props => props.theme.spacing(3)};
  z-index: 1000;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing(1)} ${props => props.theme.spacing(2)};
  margin-left: ${props => props.theme.spacing(2)};
  cursor: pointer;
  font-family: ${props => props.theme.fonts.main};
  font-size: ${props => props.theme.fontSizes.body};
  color: ${props => props.theme.textColor.normal};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const UserInfo = styled(Text3)`
  color: ${props => props.theme.textColor.normal};
  margin-right: auto; // pushes it to the left
`;

const NavBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <NavContainer>
      <UserInfo>{user.name || 'Guest'}</UserInfo>
      <NavButton onClick={() => navigate('/user')}>Active Project</NavButton>
      <NavButton onClick={handleLogout}>Logout</NavButton>
    </NavContainer>
  );
};

export default NavBar;