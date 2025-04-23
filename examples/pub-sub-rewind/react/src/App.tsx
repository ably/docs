import '../styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Odds from './Odds';

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/odds" element={<Odds />} />
      </Routes>
    </div>
  );
}
