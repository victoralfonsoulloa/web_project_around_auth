import logo from '../../images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ currentUser, setCurrentUser, setIsLoggedIn }) {
  const [action, setAction] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/signin') setAction('Register');
    else if (location.pathname === '/signup') setAction('Log In');
    else setAction('Log Out');
  }, [location]);

  const handleAction = () => {
    if (action === 'Log Out') {
      localStorage.removeItem('jwt');
      setCurrentUser({});
      setIsLoggedIn(false);
      navigate('/signin');
    }
    if (action === 'Register') navigate('/signup');
    if (action === 'Log In') navigate('/signin');
  };

  return (
    <header className="header">
      <img src={logo} alt="Around the U.S logo" className="header__logo" />
      <div className="header__content">
        {/* Show email and logout if logged in */}
        {currentUser.email ? (
          <div className="header__menu">
            <span className="header__user">{currentUser.email}</span>
            <span className="header__action" onClick={handleAction}>
              {action}
            </span>
          </div>
        ) : (
          <div className="header__menu">
            <span className="header__action" onClick={handleAction}>
              {action}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
