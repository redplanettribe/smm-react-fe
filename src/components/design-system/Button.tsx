import styled from 'styled-components';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const Button = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.spacing(2)} ${(props) => props.theme.spacing(2)};
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
        props.theme.colors[props.variant || 'primary']};
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  font-family: ${(props) => props.theme.fonts.main};
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;