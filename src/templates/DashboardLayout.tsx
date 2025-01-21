import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavBar/NavigationBar';
import SidePanel from './SidePanel';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: 77px auto;
  grid-template-columns: 250px auto;
  grid-template-areas:
    "header header"
    "sidebar content";
  min-height: 100vh;
`;

const HeaderWrapper = styled.header`
  grid-area: header;
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
`;

const ContentWrapper = styled.main`
  grid-area: content;
  background-color: ${props => props.theme.bgColors.primary};
`;

const DashboardLayout = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[2] || 'dashboard';

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