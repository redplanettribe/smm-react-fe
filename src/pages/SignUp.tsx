import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/design-system/Button';
import Input from '../components/design-system/Input';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { signup } from '../store/user/userSlice';
import RedirectIfLoggedIn from '../components/utility/RedirectIfLoggedIn';
import { getFontStyles } from '../components/design-system/Typography';
import { showNotification } from '../store/notifications/notificationSice';

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
    margin-bottom: 8px;
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
  margin-top: 20px;
`;

const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const SignInLink = styled.div`
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

const SignUpPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(showNotification('Passwords do not match', 'error'));
      return;
    }
    dispatch(signup(userName, firstName, lastName, email, password));
  };

  return (
    <RedirectIfLoggedIn>
      <PageContainer>
        <BoxContainer>
          <Form onSubmit={(e) => handleSignUp(e)}>
            <TitleBox>
              <Title>Sign Up</Title>
              <SubTitle>Let's increase your social media reach</SubTitle>
            </TitleBox>
            <Input
              label="Username"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TwoColumn>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </TwoColumn>
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TwoColumn>
              <Input
                label="Password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </TwoColumn>
            <BtnBox>
              <Button type="submit">Sign Up</Button>
            </BtnBox>
          </Form>
          <SignInLink>
            Do you have an account already?{' '}
            <Link to="/login">
              <LinkText>Sign In</LinkText>
            </Link>
          </SignInLink>
        </BoxContainer>
      </PageContainer>
    </RedirectIfLoggedIn>
  );
};

export default SignUpPage;
