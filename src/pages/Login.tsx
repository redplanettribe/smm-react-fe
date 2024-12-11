import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../store/root-reducer';
import { AppDispatch } from '../store/store';
import Button from '../components/design-system/Button';
import Input from '../components/design-system/Input';
import { H1 } from '../components/design-system/Typography';

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
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  max-width: 400px;
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const Title = styled(H1)`
  margin-bottom: 2rem;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.textColor.normal};
  margin-top: 1rem;
`;

const InputBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const isAuthenticated = useSelector((state: RootState) => state.user.IsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      // navigate('/app');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    console.log('logging in');
    dispatch(login(email, password));
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <Container>
      <Form>
        <Title>Login</Title>
        <InputBox>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputBox>
        <BtnBox>
        <Button onClick={handleLogin}>Login</Button>
        <Button variant='secondary' onClick={goToSignUp}>Go to Sign Up</Button>
        </BtnBox>
      </Form>
    </Container>
  );
};

export default LoginPage;