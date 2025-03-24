import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Franchise from './pages/Franchise';
import Stores from './pages/Stores';
import Contact from './pages/Contact';
import LunchRoulette from './pages/LunchRoulette';
import YouTubeExtractor from './pages/YouTubeExtractor';
import YouTubeCallback from './pages/YouTubeCallback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LunchRoulette />} />
          <Route path="about" element={<About />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="stores" element={<Stores />} />
          <Route path="contact" element={<Contact />} />
          <Route path="home" element={<Home />} />
          <Route path="youtube-extractor" element={<YouTubeExtractor />} />
          <Route path="youtube-callback" element={<YouTubeCallback />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
