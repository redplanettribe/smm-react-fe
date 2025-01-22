import React from 'react';
import styled from 'styled-components';
import Button from '../components/design-system/Button';
import { useNavigate } from 'react-router-dom';
import IconPaperPlane from '../assets/icons/PaperPlane';
import IconUsers from '../assets/icons/Users';

interface SidePanelProps {
  activePage: string;
}

const PanelContainer = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 16px;
  background-color: ${props => props.theme.bgColors.secondary};
  height: 100%;
  border-right: 1px solid ${props => props.theme.dividerColor};
`;

const menuItems = [
  { id: 'publish', label: 'Publish', icon: <IconPaperPlane /> },
  { id: 'project', label: 'Project Info', icon: <IconUsers /> },
];

const SidePanel: React.FC<SidePanelProps> = ({ activePage }) => {
  const navigate = useNavigate();

  const handleItemClick = (id: string) => {
    navigate(`/app/${id}`);
  };

  return (
    <PanelContainer>
      {menuItems.map(item => (
        <Button
          key={item.id}
          variant={item.id === activePage ? 'on' : 'off'}
          onClick={() => handleItemClick(item.id)}
          icon={item.icon}
        >
          {item.label}
        </Button>
      ))}
    </PanelContainer>
  );
};

export default SidePanel;