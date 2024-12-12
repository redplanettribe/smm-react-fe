import styled from 'styled-components';
import { Text3 } from '../components/design-system/Typography';
import { useNavigate } from 'react-router-dom';

const PanelContainer = styled.div`
  position: fixed;
  left: 0;
  top: ${props => props.theme.spacing(8)}; // Start below NavBar
  bottom: 0;
  width: ${props => props.theme.spacing(30)}; // 240px
  background-color: ${props => props.theme.colors.background};
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: ${props => props.theme.spacing(2)};
  box-sizing: border-box;
`;

const SideButton = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: ${props => props.theme.spacing(2)};
  margin-bottom: ${props => props.theme.spacing(1)};
  border: none;
  border-radius: 4px;
  background-color: ${props =>
        props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props =>
        props.active ? 'white' : props.theme.textColor.normal};
  font-family: ${props => props.theme.fonts.main};
  font-size: ${props => props.theme.fontSizes.body};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props =>
        props.active ? props.theme.colors.primary : props.theme.colors.secondary};
    color: white;
  }

  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing(2)};
`;

const ButtonText = styled(Text3)`
  margin: 0;
  font-size: ${props => props.theme.fontSizes.body};
`;

interface SidePanelProps {
    activePage: string;
}

const SidePanel: React.FC<SidePanelProps> = ({ activePage }) => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'project', label: 'Project', path: '/app/project' },
        { id: 'pqueue', label: 'Posts', path: '/app/pqueue' },
        { id: 'iqueue', label: 'Ideas', path: '/app/iqueue' },
    ];

    return (
        <PanelContainer>
            {menuItems.map((item) => (
                <SideButton
                    key={item.id}
                    active={activePage === item.id}
                    onClick={() => navigate(item.path)}
                >
                    <ButtonText>{item.label}</ButtonText>
                </SideButton>
            ))}
        </PanelContainer>
    );
};

export default SidePanel;