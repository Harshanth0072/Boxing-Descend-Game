import { Link } from 'react-router-dom';
import boxersData from '../data/boxersData';

export default function Menu() {
  return (
    <div className="menu-container">
      <h1>🥊 Boxing Game</h1>
      <p>Start your boxing career! Choose a mission:</p>
      <Link to="/avatar" className="btn">Create Your Avatar</Link>
      <div className="missions-list">
        {boxersData.map((boxer, idx) => (
          <Link key={boxer.id} to={`/game/${boxer.id}`} className="mission-btn">
            Mission {idx + 1}: Fight {boxer.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
