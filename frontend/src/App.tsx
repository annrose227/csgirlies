import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Worlds from './pages/Worlds';
import StoryMode from './pages/StoryMode';
import QuizPage from './pages/QuizPage';
import Profile from './pages/Profile';
import './styles/girly-theme.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/worlds" element={<Worlds />} />
          <Route path="/story-mode" element={<StoryMode />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

