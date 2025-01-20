import styled from 'styled-components';
import { getFontStyles } from './Typography';

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: ${props => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

const StyledInput = styled.input`
  padding: 15px;
  border: 1px solid ${props => props.theme.dividerColor};
  border-radius: 6px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${props => props.theme.textColors.primary};
  background-color: ${props => props.theme.colors.backgroundSecondary};
  
  &::placeholder {
    color: ${props => props.theme.textColors.secondary};
    ${({ theme }) => getFontStyles('r_14')(theme)};
  }

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: none;
  }
`;

const Input: React.FC<InputProps> = ({ label, placeholder, type = 'text', value, onChange }) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </InputContainer>
  );
};

export default Input;