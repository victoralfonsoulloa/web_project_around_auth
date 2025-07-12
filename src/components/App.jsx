import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login/Login';
import Register from './Register/Register';
import '../index.css';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        // setIsLoggedIn(true);
      })
      .catch((err) => {
        // setIsLoggedIn(false);
        console.error('Failed to fetch user info:', err);
      });
  }, []);

  const handleUpdateUser = async ({ name, about }) => {
    try {
      const newData = await api.setUserInfo(name, about);
      setCurrentUser(newData);
    } catch (err) {
      console.error('Failed to update user info:', err);
    }
  };

  const handleUpdateAvatar = async ({ avatar }) => {
    try {
      const updatedUser = await api.changeProfilePicture(avatar);
      setCurrentUser(updatedUser);
    } catch (err) {
      console.error('Failed to update avatar:', err);
    }
  };

  return (
    <div className="content-wrapper">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <main />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="*"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <main />
              </ProtectedRoute>
            }
          />
        </Routes>
        {isLoggedIn ? <Footer /> : ''}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
