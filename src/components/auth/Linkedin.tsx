import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { publisherApi } from '../../api/publisher/publisher-api';
import { selectActiveProject } from '../../store/projects/projectSlice';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/userSlice';
import { PlatformID } from '../../api/publisher/types';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { showNotification } from '../../store/notifications/notificationSice';

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

// In LinkedinCallbackHandler component
const LinkedinCallbackHandler: React.FC = () => {
  const project = useSelector(selectActiveProject);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const code = new URLSearchParams(window.location.search).get('code');
  const hasAuthenticated = useRef(false);

  useEffect(() => {
    let mounted = true;

    const authenticateWithLinkedin = async (code: string) => {
      if (!code || !mounted || hasAuthenticated.current) return;
      hasAuthenticated.current = true;
      try {
        await publisherApi.authenticatePlatform({
          projectID: project.id,
          userID: user.id,
          platformID: PlatformID.LINKEDIN,
          code,
        });

        if (mounted) {
          dispatch(showNotification('Successfully authenticated with LinkedIn', 'success'));
        }
      } catch (error) {
        if (mounted) {
          dispatch(showNotification('Failed to authenticate with LinkedIn', 'error'));
        }
      }
    };

    authenticateWithLinkedin(code || '');

    return () => {
      mounted = false;
    };
  }, [code, project.id, user.id, navigate, dispatch]);

  return (
    <ContentArea>
      <Title>Saving LinkedIn authentication data...</Title>
    </ContentArea>
  );
};

export default LinkedinCallbackHandler;
