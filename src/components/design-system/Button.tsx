import styled from 'styled-components';

interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
}

const Button = styled.button<ButtonProps>`
  padding: ${(props) => props.theme.spacing(1)} ${(props) => props.theme.spacing(2)};
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
        props.theme.colors[props.variant || 'primary']};
  color: #fff;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export default Button;