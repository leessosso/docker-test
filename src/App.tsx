import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Franchise from './pages/Franchise';
import Stores from './pages/Stores';
import Contact from './pages/Contact';
import LunchRoulette from './components/LunchRoulette';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="franchise" element={<Franchise />} />
          <Route path="stores" element={<Stores />} />
          <Route path="contact" element={<Contact />} />
          <Route path="lunch-roulette" element={<LunchRoulette />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
