// src/modules/NavBar/UserMenu/UserMenu.tsx
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store/root-reducer';
import { logout } from '../../../store/user/userSlice';
import ChevronDownIcon from '../../../assets/icons/ChevronDown';
import { getFontStyles } from '../../../components/design-system/Typography';
import UserIcon from './UserIcon';
import { AppDispatch } from '../../../store/store';
import { toggleTheme } from '../../../store/theme/themeSlice';

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MenuTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 8px;
`;

const UserName = styled.span`
  ${({ theme }) => getFontStyles('m_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
`;

const UserEmail = styled.span`
  ${({ theme }) => getFontStyles('r_12')(theme)};
  color: ${(props) => props.theme.textColors.secondary};
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 16px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.primary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.dividerColor};
  }
`;

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleToggleTheme = () => {
    console;
    dispatch(toggleTheme());
  };

  return (
    <MenuContainer ref={menuRef}>
      <MenuTrigger onClick={() => setIsOpen(!isOpen)}>
        <UserIcon size={32} />
        <UserInfo>
          <UserName>{user.firstName}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
        <ChevronDownIcon />
      </MenuTrigger>

      <DropdownMenu $isOpen={isOpen}>
        <MenuItem
          onClick={() => {
            setIsOpen(false);
            handleToggleTheme();
          }}
        >
          Toggle Dark | Light Mode
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsOpen(false);
            // Add navigation to profile
          }}
        >
          Profile Settings
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsOpen(false);
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </DropdownMenu>
    </MenuContainer>
  );
};

export default UserMenu;
