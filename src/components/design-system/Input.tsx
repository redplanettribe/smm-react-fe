import styled from 'styled-components';

const Input = styled.input`
  padding: ${(props) => props.theme.spacing(1)};
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  background-color: #f8f9fa;

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
    outline: none;
  }
`;

export default Input;