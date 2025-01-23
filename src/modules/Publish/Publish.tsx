import styled from "styled-components";
import { useSelector } from "react-redux";
import { getFontStyles } from "../../components/design-system/Typography";
import { useState } from "react";
import Button from "../../components/design-system/Button";
import IconPlus from "../../assets/icons/Plus";
import { selectActivePost, selectActivePostMediaData, selectEnabledPlatforms } from "../../store/projects/projectSlice";
import PostList from "./PostList";
import MediaCard from "./MediaCard";

const Container = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 24px;
  padding: 24px;
  height: 100%;
`;



const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Section = styled.div`
  background: ${props => props.theme.bgColors.secondary};
  color: ${props => props.theme.textColors.primary};
  border-radius: 8px;
  padding: 24px;
`;

const MediaSection = styled(Section)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
`;

const MediaItem = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background: ${props => props.theme.bgColors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PostInfo = styled(Section)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${props => props.theme.textColors.primary};
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${props => props.theme.textColors.primary};
  background: ${props => props.$isActive ? props.theme.bgColors.primary : 'transparent'};

  &:hover {
    background: ${props => props.theme.bgColors.primary};
  }
`;


const ContentHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;


const Publish: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const activePost = useSelector(selectActivePost);
  const mediaData = useSelector(selectActivePostMediaData);
  const enabledPlatforms = useSelector(selectEnabledPlatforms);



  return (
    <Container>
      <PostList />
      <ContentArea>
        {activePost ? (
          <>
            <ContentHeader>
              <Button>
                Publish Post
              </Button>
            </ContentHeader>
            <MediaSection>
              {mediaData && mediaData.map(media => (
                <MediaCard key={media.id} media={media} />
              ))}
              <Button variant="off" icon={<IconPlus />} />
            </MediaSection>

            <PostInfo>
              <InfoRow>
                <span>Title:</span>
                <span>{activePost.title}</span>
              </InfoRow>
              <InfoRow>
                <span>Type:</span>
                <span>{activePost.type}</span>
              </InfoRow>
              <InfoRow>
                <span>Content:</span>
                <span>{activePost.textContent}</span>
              </InfoRow>
              <InfoRow>
                <span>Created By:</span>
                <span>{activePost.createdBy}</span>
              </InfoRow>
            </PostInfo>

            <Section>
              <TabsContainer>
                {enabledPlatforms.map(platform => (
                  <Tab
                    key={platform.id}
                    $isActive={activeTab === platform.id}
                    onClick={() => setActiveTab(platform.id)}
                  >
                    {platform.name}
                  </Tab>
                ))}
                <Tab $isActive={false} onClick={() => setActiveTab('add')}>
                  <IconPlus />
                </Tab>
              </TabsContainer>

              {/* Platform specific settings would go here based on activeTab */}
            </Section>
          </>
        ) : (
          <Section>Select a post to view details</Section>
        )}
      </ContentArea>
    </Container>
  );
};

export default Publish;