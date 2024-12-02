// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const Navbar = () => {
  const { profile } = useProfile();

  return (
    <nav>
      <Link to="/profile-form">Create/Update Profile</Link>
      <Link to="/profile">View Profile</Link>
      <div>
        {profile ? (
          <p>Welcome, {profile.name.split(' ')[0]}</p>
        ) : (
          <p>No profile found</p>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
