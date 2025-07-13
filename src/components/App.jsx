import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login/Login';
import Register from './Register/Register';
import Popup from './Main/Components/Popup/Popup';
import StatusPopup from './Main/Components/Popup/StatusPopup/StatusPopup';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import successImage from '../images/success-image.svg';
import errorImage from '../images/error-image.svg';
import '../index.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isErrorPopupOpen, setIsErrorPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if (token) {
      auth
        .getUserData(token)
        .then((userData) => {
          setCurrentUser((prevData) => ({
            ...prevData,
            ...userData.data,
          }));
          console.log('current user:', currentUser);
          setIsLoggedIn(true);
          navigate('/');
        })
        .catch((err) => {
          console.error('Invalid token:', err);
          setIsLoggedIn(false);
          localStorage.removeItem('jwt'); // Remove invalid token
        });
    }
  }, []);

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
      setCurrentUser((prevData) => ({
        ...prevData,
        ...newData,
      }));
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

  const handleRegistration = ({ email, password }) => {
    if (email && password) {
      auth
        .register(email, password)
        .then(() => {
          console.log('user succesfully registered');
          setIsSuccessPopupOpen(true);
        })
        .catch(() => {
          console.error;
          setIsErrorPopupOpen(true);
        });
    }
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          localStorage.setItem('jwt', data.token);
          auth
            .getUserData(data.token)
            .then((userData) => {
              console.log(userData);
              navigate('/');
            })
            .catch(console.error);
        }
      })
      .catch(() => {
        console.error;
        setIsErrorPopupOpen(true);
      });
  };

  return (
    <div className="content-wrapper">
      <CurrentUserContext.Provider
        value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
      >
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegistration} />}
          />
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

        {isSuccessPopupOpen && (
          <Popup onClose={() => setIsSuccessPopupOpen(false)}>
            <StatusPopup
              image={successImage}
              title="Awesome, you have been successfully registered."
            />
          </Popup>
        )}

        {isErrorPopupOpen && (
          <Popup onClose={() => setIsErrorPopupOpen(false)}>
            <StatusPopup
              image={errorImage}
              title="Oops, something went wrong. Please try again!"
            />
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
