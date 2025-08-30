import React, { useState } from 'react';

export default function Milestones() {
  const [volume, setVolume] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Milestone submitted: ${volume} kg of H2`);
  };

  return (
    <div>
      <h2>Report Milestone</h2>
      <form onSubmit={handleSubmit}>
        <input type='number' placeholder='Enter H2 volume (kg)' value={volume} onChange={(e) => setVolume(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}