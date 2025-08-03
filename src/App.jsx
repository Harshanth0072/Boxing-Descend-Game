import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import AvatarCreation from './components/AvatarCreation';
import GameArena from './components/GameArena';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/avatar" element={<AvatarCreation />} />
      <Route path="/game/:missionId" element={<GameArena />} />
    </Routes>
  );
}

export default App;
