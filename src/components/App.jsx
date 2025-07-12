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

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
        // setIsAuthorized(true);
      })
      .catch((err) => {
        // setIsAuthorized(false);
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
              isAuthorized ? <Main /> : <Navigate to="/signin" replace />
            }
          />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            path="*"
            element={
              isAuthorized ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>
        {isAuthorized ? <Footer /> : ""}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
