import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <h2>Green H2 Subsidy</h2>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/milestones'>Milestones</Link>
        <Link to='/subsidy'>Subsidy</Link>
        <Link to='/audit'>Audit Trail</Link>
      </div>
    </nav>
  );
}