import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boxersData from '../data/boxersData';
import DialogueBox from './DialogueBox';

export default function GameArena() {
  const { missionId } = useParams();
  const opponent = boxersData.find(b => b.id === missionId);
  const navigate = useNavigate();

  const arenaRef = useRef(null);
  const [dialogueShown, setDialogueShown] = useState(true);

  const [playerPos, setPlayerPos] = useState({ x: 50, y: 150 });
  const [opponentPos, setOpponentPos] = useState({ x: 400, y: 150 });

  const [playerHP, setPlayerHP] = useState(100);
  const [opponentHP, setOpponentHP] = useState(100);
  const [punchEffect, setPunchEffect] = useState(false);
  const [opponentHit, setOpponentHit] = useState(false);



  const avatar = JSON.parse(localStorage.getItem('playerAvatar')) || {};

  // Movement
  useEffect(() => {
    function handleKeyDown(e) {
      setPlayerPos(pos => {
        const step = 10;
        let newX = pos.x;
        let newY = pos.y;

        if (e.key === 'ArrowRight' || e.key === 'd') newX += step;
        if (e.key === 'ArrowLeft' || e.key === 'a') newX -= step;
        if (e.key === 'ArrowUp' || e.key === 'w') newY -= step;
        if (e.key === 'ArrowDown' || e.key === 's') newY += step;

        // Stay in bounds
        newX = Math.max(0, Math.min(550, newX));
        newY = Math.max(0, Math.min(350, newY));
        return { x: newX, y: newY };
      });
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Mouse click to punch
  function handlePunch() {
  const distance = Math.abs(playerPos.x - opponentPos.x) + Math.abs(playerPos.y - opponentPos.y);
  if (distance < 100) {
    setOpponentHP(hp => Math.max(0, hp - 10));
    setPunchEffect(true);
    setOpponentHit(true);
    setTimeout(() => setPunchEffect(false), 150);
    setTimeout(() => setOpponentHit(false), 100);
  }
}



  useEffect(() => {
    // Opponent AI — basic auto attack
    if (opponentHP > 0) {
      const aiInterval = setInterval(() => {
        const distance = Math.abs(playerPos.x - opponentPos.x) + Math.abs(playerPos.y - opponentPos.y);
        if (distance < 120) {
          setPlayerHP(hp => Math.max(0, hp - 5));
        }
      }, 1500);
      return () => clearInterval(aiInterval);
    }
  }, [playerPos, opponentPos, opponentHP]);

  useEffect(() => {
    if (opponentHP <= 0) {
      alert('You win!');
      navigate('/');
    } else if (playerHP <= 0) {
      alert('You lose!');
      navigate('/');
    }
  }, [opponentHP, playerHP, navigate]);

  return (
  <div className="game-arena" onClick={handlePunch} ref={arenaRef}>
    
    {/* Flash effect when punch lands */}
    {punchEffect && (
      <div className="punch-flash"></div>
    )}

    {/* Dialogue shown at the start of the match */}
    {dialogueShown && (
      <DialogueBox
        opponentName={opponent.name}
        dialogue={opponent.dialogue}
        onClose={() => setDialogueShown(false)}
      />
    )}

    {/* Player avatar */}
    <div
      className="avatar player"
      style={{
        left: playerPos.x,
        top: playerPos.y,
        backgroundImage: `url('/player.png')`
      }}
    />

    {/* Opponent avatar */}
    <div
  className={`avatar opponent ${opponentHit ? 'shake' : ''}`}
  style={{
    left: opponentPos.x,
    top: opponentPos.y,
    backgroundImage: `url('/opponent.png')`
  }}
/>


    {/* HUD with HP */}
    <div className="hud">
      <p>🧍 You: {playerHP} HP</p>
      <p>🥊 {opponent.name}: {opponentHP} HP</p>
    </div>
  </div>
);

}
