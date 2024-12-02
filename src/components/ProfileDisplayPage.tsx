// src/components/ProfileDisplayPage.tsx

import React, { useEffect, useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import axios from 'axios';

const ProfileDisplayPage = () => {
  const { profile, clearProfile } = useProfile();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) {
      const localProfile = localStorage.getItem('profile');
      if (localProfile) {
        setLoading(false);
        return;
      }

      axios
        .get(`${process.env.REACT_APP_API_BASE_URL}/profiles/1`)
        .then((response) => {
          setLoading(false);
          if (response.data) {
            localStorage.setItem('profile', JSON.stringify(response.data));
            clearProfile();
          }
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [profile, clearProfile]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {profile ? (
            <div>
              <h1>Profile Details</h1>
              <p>Name: {profile.name}</p>
              <p>Email: {profile.email}</p>
              <p>Age: {profile.age || 'Not Provided'}</p>
            </div>
          ) : (
            <p>No profile found. Please create a profile.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileDisplayPage;
