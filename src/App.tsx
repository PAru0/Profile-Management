// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfileFormPage from './components/ProfileFormPage';
import ProfileDisplayPage from './components/ProfileDisplayPage';
import Navbar from './components/Navbar';
import NotFoundPage from './components/NotFoundPage';
import { ProfileProvider } from './context/ProfileContext';

const App = () => {
  return (
    <ProfileProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/profile-form" element={<ProfileFormPage />} />
          <Route path="/profile" element={<ProfileDisplayPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ProfileProvider>
  );
};

export default App;
