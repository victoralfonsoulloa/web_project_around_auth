import React, { useState, useEffect } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error('Failed to fetch user info:', err);
      });
  }, []);

  const handleUpdateUser = async ({name, about}) => {
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
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
        <Header />
        <Main />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
