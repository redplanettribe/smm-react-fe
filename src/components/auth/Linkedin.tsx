import React, { useEffect } from 'react';
import styled from 'styled-components';
import { publisherApi } from '../../api/publisher/publisher-api';
import { selectActiveProject } from '../../store/projects/projectSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/userSlice';
import { PlatformID } from '../../api/publisher/types';

const ContentArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColors.primary};
  margin-bottom: 8px;
`;

const LinkedinCallbackHandler: React.FC = () => {
  const project = useSelector(selectActiveProject);
  const user = useSelector(selectUser);

  const authenticateWithLinkedin = async (code: string) => {
    try {
      const response = await publisherApi.authenticatePlatform({
        projectID: project.id,
        userID: user.id,
        platformID: PlatformID.LINKEDIN,
        code,
      });
      console.log('Successfully authenticated with LinkedIn:', response);
    } catch (error) {
      console.error('Error authenticating with LinkedIn:', error);
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    code && authenticateWithLinkedin(code);
  }, []);

  return (
    <ContentArea>
      <Title>Saving LinkedIn authentication data...</Title>
    </ContentArea>
  );
};

export default LinkedinCallbackHandler;
