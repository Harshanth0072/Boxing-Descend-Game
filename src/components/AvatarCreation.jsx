import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AvatarCreation() {
  const [avatar, setAvatar] = useState({ skin: 'light', gloves: 'red' });
  const navigate = useNavigate();

  function handleStart() {
    localStorage.setItem('playerAvatar', JSON.stringify(avatar));
    navigate('/game/ksi'); // start first mission
  }

  return (
    <div className="avatar-creation">
      <h2>Create Your Avatar</h2>
      <label>
        Skin color:
        <select
          value={avatar.skin}
          onChange={e => setAvatar({ ...avatar, skin: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="tan">Tan</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label>
        Gloves color:
        <select
          value={avatar.gloves}
          onChange={e => setAvatar({ ...avatar, gloves: e.target.value })}
        >
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
        </select>
      </label>
      <button onClick={handleStart}>Start Fighting!</button>
    </div>
  );
}
