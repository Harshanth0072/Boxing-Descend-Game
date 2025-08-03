export default function DialogueBox({ opponentName, dialogue, onClose }) {
  return (
    <div className="dialogue-box">
      <h3>{opponentName} says:</h3>
      <p>“{dialogue}”</p>
      <button onClick={onClose}>Enter Ring</button>
    </div>
  );
}
