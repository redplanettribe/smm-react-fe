import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/root-reducer';
import { getFontStyles } from '../../components/design-system/Typography';
import { formatDate } from '../../utils';
import { useState, useEffect } from 'react';
import { publisherApi } from '../../api/publisher/publisher-api';
import { Publisher } from '../../api/publisher/types';
import Button from '../../components/design-system/Button';
import IconPlus from '../../assets/icons/Plus';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import {
  enablePlatform,
  getDefaulUserPlatformInfo,
  setSelectedProject,
} from '../../store/projects/projectSlice';
import PlatformInfo from './PlatformInfo';
import { openModal } from '../../store/modal/modalSlice';

const FloatingMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};
  z-index: 1000;
`;

const MenuItem = styled.div`
  padding: 16px;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.bgColors.secondary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.dividerColor};
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const ContentArea = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('sb_24')(theme)};
`;

const InfoCard = styled.div`
  background-color: ${(props) => props.theme.bgColors.secondary};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
`;

const InfoSection = styled.div`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_16')(theme)};
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
  margin-bottom: 8px;
`;

const TeamList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const TeamMember = styled.div`
  background-color: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  padding: 16px;
`;

const MemberName = styled.div`
  color: ${(props) => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

const MemberEmail = styled.div`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const DateInfo = styled.div`
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const InlineDescriptions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 4px;
  color: ${(props) => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.primary};
  background: ${(props) => (props.$isActive ? props.theme.bgColors.primary : 'transparent')};
  border: 1px solid ${(props) => props.theme.dividerColor};

  &:hover {
    background: ${(props) => props.theme.bgColors.primary};
  }
`;

const PlatformContent = styled.div`
  background: ${(props) => props.theme.bgColors.primary};
  border: 1px solid ${(props) => props.theme.dividerColor};
  border-radius: 4px;
  padding: 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ProjectInfo: React.FC = () => {
  const { activeProject, team } = useSelector((state: RootState) => state.project);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availablePlatforms, setPlatfroms] = useState<Publisher[]>([]);
  const enabledPlatforms = useSelector((state: RootState) => state.project.enabledPlatforms);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const isDefaultUser = team.some((member) => member.id === user.id && member.defaultUser);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchPublishers = async () => {
      const availablePlatforms = await publisherApi.getAvailablePublishers();
      setPlatfroms(availablePlatforms || []);
    };
    if (isMenuOpen) {
      fetchPublishers();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (activeProject.id) {
      dispatch(setSelectedProject(activeProject.id));
    }
  }, [activeProject.id]);

  useEffect(() => {
    if (!activeTab && enabledPlatforms.length > 0) {
      setActiveTab(enabledPlatforms[0].id);
    }
    if (activeTab && activeProject.id) {
      dispatch(getDefaulUserPlatformInfo(activeProject.id, activeTab));
    }
  }, [activeTab]);

  const handlePublisherSelect = (publisher: Publisher) => {
    dispatch(enablePlatform(activeProject.id, publisher.id));
    setIsMenuOpen(false);
  };

  return (
    <ContentArea>
      <TitleContainer>
        <Title>{activeProject.name}</Title>
        <Button variant="off" onClick={() => dispatch(openModal({ type: 'EDIT_PROJECT' }))}>
          Edit Project
        </Button>
      </TitleContainer>

      <InfoCard>
        <InfoSection>
          <SectionTitle>Project Description</SectionTitle>
          <Description>{activeProject.description || 'No description provided.'}</Description>
        </InfoSection>

        <InfoSection>
          <SectionTitle>Project Details</SectionTitle>
          <DateInfo>Created: {formatDate(activeProject.createdAt)}</DateInfo>
          <DateInfo>Last Updated: {formatDate(activeProject.updatedAt)}</DateInfo>
        </InfoSection>
      </InfoCard>

      <InfoCard>
        <InfoSection>
          <SectionTitle>Team Members</SectionTitle>
          <TeamList>
            {team.map((member) => (
              <TeamMember key={member.id}>
                <MemberName>{member.name}</MemberName>
                <MemberEmail>{member.email}</MemberEmail>
                <InlineDescriptions>
                  {member.defaultUser && <>Default User, </>}
                  {member.role}
                </InlineDescriptions>
              </TeamMember>
            ))}
          </TeamList>
        </InfoSection>
      </InfoCard>

      <InfoCard>
        <InfoSection>
          <SectionTitle>Enabled Platforms</SectionTitle>
          <TabsContainer>
            {enabledPlatforms.map((platform) => (
              <Tab
                key={platform.id}
                $isActive={activeTab === platform.id}
                onClick={() => setActiveTab(platform.id)}
              >
                {platform.name}
              </Tab>
            ))}
            <ButtonWrapper>
              <Button
                variant="off"
                icon={<IconPlus />}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
              <FloatingMenu $isOpen={isMenuOpen}>
                {availablePlatforms.map((publisher) => (
                  <MenuItem key={publisher.id} onClick={() => handlePublisherSelect(publisher)}>
                    {publisher.name}
                  </MenuItem>
                ))}
              </FloatingMenu>
            </ButtonWrapper>
          </TabsContainer>

          {activeTab && (
            <PlatformContent>
              {enabledPlatforms.map((platform) => {
                if (platform.id !== activeTab) return null;
                return (
                  <PlatformInfo
                    key={platform.id}
                    platform={platform}
                    isDefaultUser={isDefaultUser}
                  />
                );
              })}
            </PlatformContent>
          )}
        </InfoSection>
      </InfoCard>
    </ContentArea>
  );
};

export default ProjectInfo;
