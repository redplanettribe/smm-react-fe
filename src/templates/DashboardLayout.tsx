import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './NavigationBar';
import SidePanel from './SidePanel';

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  padding-left: ${props => props.theme.spacing(30)};
  padding-top: ${props => props.theme.spacing(10)};
  min-height: 100vh;
  width: 100%;
  background-color: ${props => props.theme.colors.background};
  box-sizing: border-box;
`;

const DashboardLayout = () => {
    const location = useLocation();
    const currentPage = location.pathname.split('/')[2] || 'dashboard';

    return (
        <LayoutContainer>
            <NavBar />
            <SidePanel activePage={currentPage} />
            <ContentWrapper>
                <Outlet />
            </ContentWrapper>
        </LayoutContainer>
    );
};

export default DashboardLayout;