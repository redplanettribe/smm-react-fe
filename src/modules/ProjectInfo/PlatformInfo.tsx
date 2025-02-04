import styled from 'styled-components';
import { getFontStyles } from '../../components/design-system/Typography';
import Button from '../../components/design-system/Button';
import { authenticateTo } from '../../api/ third-party';
import { useSelector } from 'react-redux';
import {
  disablePlatform,
  selectActiveProject,
  selectPlatformInfo,
} from '../../store/projects/projectSlice';
import { Publisher } from '../../api/publisher/types';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PlatformStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Status = styled.div<{ $isAuthenticated: boolean }>`
  color: ${(props) =>
    props.$isAuthenticated ? props.theme.colors.active : props.theme.colors.warning};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

const AuthInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthTTL = styled.div`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

interface PlatformInfoProps {
  platform: Publisher;
  isDefaultUser: boolean;
}

const PlatformInfo: React.FC<PlatformInfoProps> = ({ platform, isDefaultUser }) => {
  const dispatch: AppDispatch = useDispatch();
  const activeProject = useSelector(selectActiveProject);
  const defaultUserPlatformInfo = useSelector(selectPlatformInfo(platform.id));

  const handleAuthenticate = useCallback(() => {
    authenticateTo(platform.id);
  }, [platform.id]);

  const handleDisable = useCallback(() => {
    if (!activeProject) return;
    dispatch(disablePlatform(activeProject.id, platform.id));
  }, [activeProject, platform.id, dispatch]);

  return (
    <Container>
      <PlatformStatus>
        <ButtonGroup>
          <Button variant="off" onClick={handleDisable}>
            Disable
          </Button>
        </ButtonGroup>
      </PlatformStatus>
      <PlatformStatus>
        <AuthInfo>
          <Status $isAuthenticated={defaultUserPlatformInfo?.isAuthenticated || false}>
            {defaultUserPlatformInfo?.isAuthenticated
              ? 'Default user Authenticated'
              : 'Default user not Authenticated'}
          </Status>
          {defaultUserPlatformInfo?.isAuthenticated && defaultUserPlatformInfo?.authTTL && (
            <AuthTTL>Authentication expires: {defaultUserPlatformInfo.authTTL}</AuthTTL>
          )}
        </AuthInfo>
        {isDefaultUser && (
          <Button onClick={handleAuthenticate}>Authenticate with {platform.name}</Button>
        )}
      </PlatformStatus>
    </Container>
  );
};

export default PlatformInfo;
