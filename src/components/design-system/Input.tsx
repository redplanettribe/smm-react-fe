import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import IconEye from '../../assets/icons/Eye';
import { getFontStyles } from './Typography';
import IconEyeOff from '../../assets/icons/Eye-Off';

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
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid ${props => props.theme.dividerColor};
  border-radius: 6px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${props => props.theme.textColors.primary};
  background-color: ${props => props.theme.bgColors.secondary};

  &::placeholder {
    color: ${props => props.theme.textColors.secondary};
    ${({ theme }) => getFontStyles('r_14')(theme)};
  }

  &:focus {
    border-color: ${props => props.theme.textColors.primary};
    outline: none;
  }
`;

const InputBox = styled.div`
  position: relative;
  box-sizing: border-box;
`;

const ToggleIcon = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const finalType = isPasswordField && showPassword ? 'text' : type;

  const togglePasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <InputContainer>
      <Label>{label}</Label>
      <InputBox>
        <StyledInput
          type={finalType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {isPasswordField && (
          <ToggleIcon onClick={togglePasswordVisibility}>
            {showPassword ? (
              <IconEye color={theme.textColors.secondary} />
            ) : (
              <IconEyeOff color={theme.textColors.secondary} />
            )}
          </ToggleIcon>
        )}
      </InputBox>
    </InputContainer>
  );
};

export default Input;