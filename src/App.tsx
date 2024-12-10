import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import MainDashboardPage from './pages/MainDashboard';
import MarketingPage from './pages/Marketing';
import Authenticated from './components/utility/AuthenticatedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MarketingPage />} />
        <Route path="/app" element={<Authenticated element={<MainDashboardPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App
