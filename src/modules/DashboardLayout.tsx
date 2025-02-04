import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar/NavigationBar';
import SidePanel from './SidePanel';
import { useSelector } from 'react-redux';
import { selectActiveProject } from '../store/projects/projectSlice';
import { getFontStyles } from '../components/design-system/Typography';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 77px 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    'header header'
    'sidebar content';
  height: 100vh;
  overflow: hidden;
`;

const NoProjectContainer = styled.div`
  display: grid;
  grid-template-rows: 77px 1fr;
  grid-template-areas:
    'header'
    'content';
  height: 100vh;
  overflow: hidden;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;
  color: ${(props) => props.theme.textColors.primary};
`;

const Message = styled.h2`
  ${({ theme }) => getFontStyles('m_16')(theme)};
  text-align: center;
`;

const SubMessage = styled.p`
  ${({ theme }) => getFontStyles('r_14')(theme)};
  color: ${(props) => props.theme.textColors.secondary};
`;

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
`;

const ContentWrapper = styled.main`
  grid-area: content;
  background-color: ${(props) => props.theme.bgColors.primary};
  overflow-y: auto;
  height: 100%;
  padding-bottom: 24px;
`;

const DashboardLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[2] || 'publish';
  const activeProject = useSelector(selectActiveProject);

  if (!activeProject.id) {
    return (
      <NoProjectContainer>
        <HeaderWrapper>
          <NavBar />
        </HeaderWrapper>
        <ContentWrapper>
          <MessageContainer>
            <Message>No Project Selected</Message>
            <SubMessage>
              Please select an existing project or create a new one from the dropdown above
            </SubMessage>
          </MessageContainer>
        </ContentWrapper>
      </NoProjectContainer>
    );
  }

  return (
    <LayoutContainer>
      <HeaderWrapper>
        <NavBar />
      </HeaderWrapper>
      <SidebarWrapper>
        <SidePanel activePage={currentPage} />
      </SidebarWrapper>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutContainer>
  );
};

export default DashboardLayout;
