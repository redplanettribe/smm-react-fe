import React from 'react';
import styled from 'styled-components';
import { getFontStyles } from './Typography';

interface ButtonProps {
  variant?: 'on' | 'off';
  fontSize?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  [key: string]: any;
}

interface StyledButtonProps {
  $hasIcon?: boolean;
  $variant?: 'on' | 'off';
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $hasIcon }) => ($hasIcon ? 'flex-start' : 'center')};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  ${({ theme }) => getFontStyles('m_16')(theme)};
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.textColors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary_60};
  }

  &:focus {
    outline: none;
  }

  ${({ theme, $variant = 'on' }) => {
    switch (theme.type) {
      case 'light':
        if ($variant === 'off') {
          return `
            background-color: ${theme.bgColors.secondary};
            color: ${theme.textColors.secondary};
          `;
        }
        break;
      case 'dark':
        if ($variant === 'off') {
          return `
            background-color: ${theme.bgColors.primary};
            color: ${theme.textColors.secondary};
          `;
        }
        if ($variant === 'on') {
          return `
            background-color: ${theme.colors.primary};
            color: ${theme.colors.black};
          `;
        }
        break;
    }
}}
`;

const IconWrapper = styled.span<{ $centered?: boolean }>`
  display: inline-flex;
  align-items: center;
  margin-right: ${({ $centered }) => ($centered ? '0' : '20px')};
  
  svg {
    stroke: currentColor;
  }
`;

const Button: React.FC<ButtonProps> = ({ icon, variant, children, ...rest }) => {
  return (
    <StyledButton $hasIcon={!!icon} $variant={variant} {...rest}>
      {icon && <IconWrapper $centered={!children}>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

export default Button;