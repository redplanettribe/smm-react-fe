import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../store/user/userSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import Button from '../components/design-system/Button';
import Input from '../components/design-system/Input';
import RedirectIfLoggedIn from '../components/utility/RedirectIfLoggedIn';
import { getFontStyles } from '../components/design-system/Typography';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.bgColors.secondary};
`;

const BoxContainer = styled.div`
  ${({ theme }) => `
    background: ${theme.bgColors.primary};
    padding: 40px;
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-width: 375px;
    max-width: 540px;
    width: 100%;
    display: flex;
    flex-direction: column;
  `}

`;
const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h1`
  ${({ theme }) => `
    color: ${theme.textColors.primary};
    margin-bottom: ${theme.spacing(1)};
  `}
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.h2`
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${({ theme }) => theme.textColors.secondary};
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
`;

const SignUpLink = styled.a`
  ${({ theme }) => `
    color: ${theme.textColors.primary};
    text-align: center;
    margin-top: 20px;
    cursor: pointer;
  `}
`;

const LinkText = styled.span`
  ${({ theme }) => `
    color: ${theme.colors.support};
    cursor: pointer;
  `}
`;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(email, password));
  };

  return (
    <RedirectIfLoggedIn>
      <PageContainer>
        <BoxContainer>
          <Form>
            <TitleBox>
              <Title>Sign In</Title>
              <SubTitle>Let's increase your social media reach</SubTitle>
            </TitleBox>

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <BtnBox>
              <Button onClick={handleLogin}>Login</Button>
            </BtnBox>
          </Form>
          <SignUpLink>Don't have an account?{' '}
            <Link to="/signup">
              <LinkText>Sign Up</LinkText>
            </Link>
          </SignUpLink>
        </BoxContainer>
      </PageContainer>
    </RedirectIfLoggedIn>
  );
};

export default LoginPage;