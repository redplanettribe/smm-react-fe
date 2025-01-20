import styled from 'styled-components';

interface ButtonProps {
  variant?: 'on' | 'off';
  fontSize?: string;
}

const Button = styled.button<ButtonProps>`
  padding: 9px 10px;
  border: none;
  border-radius: 5px;
  font-size: ${({ fontSize, theme }) => fontSize || theme.fonts.m_16.size};
  font-family: ${({ theme }) => theme.fontFamily.main};
  color: ${({ theme }) => theme.textColors.primary};
  background-color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  
  &:hover {
   background-color: ${({ theme }) => theme.colors.primary_60};
  }
  &:focus {
    outline: none;
  }

  ${({ theme, variant = 'on' }) => {
    switch (theme.type) {
      case 'light':
        if (variant === 'off') {
          return `
            background-color: ${theme.bgColors.secondary};
            color: ${theme.textColors.secondary};
          `;
        }
        break;
      case 'dark':
        if (variant === 'off') {
          return `
            background-color: ${theme.bgColors.primary};
            color: ${theme.textColors.secondary};
          `;
        }
        break;
    }
}}
`;

export default Button;