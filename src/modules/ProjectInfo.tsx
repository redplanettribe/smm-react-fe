import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../store/root-reducer";
import { getFontStyles } from "../components/design-system/Typography";
import { formatDate } from "../utils";

const ContentArea = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${props => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('sb_24')(theme)};
`;

const InfoCard = styled.div`
  background-color: ${props => props.theme.bgColors.secondary};
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
  color: ${props => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_16')(theme)};
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: ${props => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
  margin-bottom: 8px;
`;

const TeamList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const TeamMember = styled.div`
  background-color: ${props => props.theme.bgColors.primary};
  border: 1px solid ${props => props.theme.dividerColor};
  border-radius: 4px;
  padding: 16px;
`;

const MemberName = styled.div`
  color: ${props => props.theme.textColors.primary};
  ${({ theme }) => getFontStyles('m_14')(theme)};
`;

const MemberEmail = styled.div`
  color: ${props => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const DateInfo = styled.div`
  color: ${props => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_12')(theme)};
`;

const InlineDescriptions = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 4px;
  color: ${props => props.theme.textColors.secondary};
  ${({ theme }) => getFontStyles('r_14')(theme)};
`;

const ProjectInfo: React.FC = () => {
  const { activeProject, team } = useSelector((state: RootState) => state.project);
  console.log("Date", activeProject.createdAt);
  return (
    <ContentArea>
      <Title>{activeProject.name}</Title>

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
                  {member.defaultUser && (
                    <>Default User, </>
                  )}
                  {member.role}
                </InlineDescriptions>
              </TeamMember>
            ))}
          </TeamList>
        </InfoSection>
      </InfoCard>
    </ContentArea>
  );
};

export default ProjectInfo;