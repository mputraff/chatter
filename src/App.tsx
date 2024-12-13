import './index.css';
import { UserProvider } from "./UserContext";
import { PostsProvider } from './PostsContext';
import { CommentsProvider } from './CommentsContext'; // Import CommentsProvider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Otp from './pages/Otp';
import Notifications from './pages/Notifications';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <UserProvider>
      <PostsProvider>
        <CommentsProvider> {/* Wrap with CommentsProvider */}
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/otp" element={<Otp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
          </Router>
        </CommentsProvider>
      </PostsProvider>
    </UserProvider>
  );
}

export default App;
