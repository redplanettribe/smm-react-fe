import React, { useEffect } from 'react';
import styled from 'styled-components';

const ContentArea = styled.div`
  padding: 24px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColors.primary};
  margin-bottom: 8px;
`;

const LinkedinCallbackHandler: React.FC = () => {
  useEffect(() => {
    // Get the code from URL
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code);
    const redirectURI = encodeURIComponent(import.meta.env.VITE_LINKEDIN_REDIRECT_URI);
    console.log(redirectURI);
  }, []);

  return (
    <ContentArea>
      <Title>Linkeding Callback</Title>
    </ContentArea>
  );
};

export default LinkedinCallbackHandler;
