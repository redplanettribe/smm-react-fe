import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;
const InputBox = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

`;
const Input = styled.input`
  box-sizing: border-box;
  background-color: #f9f9f9;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #5a6268;
  }
`;

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    // Mock sign-up logic
    if (password !== confirmPassword) {
      alert('Passwords do not match');
    } else {
      alert('Sign up successful');
      // Redirect to login page or dashboard
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <Container>
      <Form>
        <Title>Sign Up</Title>
        <InputBox>
        <div>
          <Label>Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Label>Password:</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        </InputBox>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <SecondaryButton onClick={goToLogin}>Back to Login</SecondaryButton>
      </Form>
    </Container>
  );
};

export default SignUpPage;