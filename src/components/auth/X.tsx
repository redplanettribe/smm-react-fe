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

const XCallbackHandler: React.FC = () => {
  const project = useSelector(selectActiveProject);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const oAuthToken = searchParams.get('oauth_token');
  const oAuthVerifier = searchParams.get('oauth_verifier');
  const hasAuthenticated = useRef(false);

  useEffect(() => {
    let mounted = true;

    const authenticateWithX = async (token: string, verifier: string) => {
      console.log('Authenticating to X');
      console.log('OAuth Token:', token);
      console.log('OAuth Verifier:', verifier);
      if (!token || !verifier || !mounted || hasAuthenticated.current) return;
      hasAuthenticated.current = true;

      try {
        await publisherApi.authenticatePlatform({
          projectID: project.id,
          userID: user.id,
          platformID: PlatformID.X,
          params: {
            oauth_token: token,
            oauth_verifier: verifier,
          },
        });

        if (mounted) {
          dispatch(showNotification('Successfully authenticated with X', 'success'));
        }
      } catch (error) {
        if (mounted) {
          dispatch(showNotification('Failed to authenticate with X', 'error'));
        }
      }
    };

    authenticateWithX(oAuthToken || '', oAuthVerifier || '');
    navigate('/app/project');

    return () => {
      mounted = false;
    };
  }, [oAuthToken, oAuthVerifier, project.id, user.id, navigate, dispatch]);

  return (
    <ContentArea>
      <Title>Saving X authentication data...</Title>
    </ContentArea>
  );
};

export default XCallbackHandler;
