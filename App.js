import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Hub } from 'aws-amplify/utils';
import { getCurrentUser } from 'aws-amplify/auth';

import HomePage from './pages/HomePage';
import ChatsPage from './pages/ChatsPage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';

import BottomNav from './components/BottomNav';
import './App.css';

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const checkCurrentUser = async () => {
      console.log('[App.js] Checking for current user...');
      try {
        const currentUser = await getCurrentUser();
        console.log('[App.js] User found:', currentUser.username);
        setUser(currentUser);
      } catch (error) {
        console.log('[App.js] No user found.');
        setUser(null);
      }
    };

    checkCurrentUser();

    const listener = (data) => {
      console.log('[App.js] Hub event received:', data.payload.event);
      if (data.payload.event === 'signedIn' || data.payload.event === 'autoSignIn') {
        checkCurrentUser();
      } else if (data.payload.event === 'signedOut') {
        setUser(null);
      }
    };

    const unsubscribe = Hub.listen('auth', listener);

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="app-container">
        <main className="app-content">
          <Routes>
            {user ? (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile/edit" element={<EditProfilePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </>
            ) : (
              <>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </main>
        {user && <BottomNav />}
      </div>
    </BrowserRouter>
  );
}

export default App;
