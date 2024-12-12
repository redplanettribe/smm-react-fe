import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import MarketingPage from './pages/Marketing';
import Authenticated from './components/utility/AuthenticatedRoute';
import DashboardLayout from './templates/DashboardLayout';
import ProjectInfo from './templates/ProjectInfo';
import PostQueue from './templates/PostQueue';
import IdeaQueue from './templates/IdeaQueue';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected dashboard routes */}
        <Route path="/app" element={<Authenticated element={<DashboardLayout />} />}>
          <Route index element={<Navigate to="/app/pqueue" replace />} />
          <Route path="project" element={<ProjectInfo />} />
          <Route path="pqueue" element={<PostQueue />} />
          <Route path="iqueue" element={<IdeaQueue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
