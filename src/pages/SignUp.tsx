import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/design-system/Button';
import Input from '../components/design-system/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { signup } from '../store/user/userSlice';
import RedirectIfLoggedIn from '../components/utility/RedirectIfLoggedIn';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #f0f0f0;
`;

const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 400px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  margin-top: 1rem;
`;
const InputBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match'); //temp
      return;
    }
    dispatch(signup(name, email, password));
    navigate('/login');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <RedirectIfLoggedIn>
      <Container>
        <Form>
          <Title>Sign Up</Title>
          <InputBox>

          </InputBox>
          <BtnBox>
            <Button onClick={handleSignUp}>Sign Up</Button>
            <Button onClick={goToLogin}>Back to Login</Button >
          </BtnBox>

        </Form>
      </Container>
    </RedirectIfLoggedIn>

  );
};

export default SignUpPage;