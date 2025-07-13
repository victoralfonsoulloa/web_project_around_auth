import logo from '../../images/logo.png';
import menuIcon from '../../images/menu.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header({ currentUser, setCurrentUser, setIsLoggedIn }) {
  const [action, setAction] = useState('');
  const [menu, setMenu] = useState(false);
  const [menuWasOpened, setMenuWasOpened] = useState(false); // NEW
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
      setMenu(false);
      setIsLoggedIn(false);
      navigate('/signin');
    }
    if (action === 'Register') navigate('/signup');
    if (action === 'Log In') navigate('/signin');
  };

  // Only show dropdown after first interaction
  const handleMenuClick = () => {
    setMenuWasOpened(true);
    setMenu(!menu);
  };

  return (
    <>
      {/* Dropdown menu above header, only for logged-in users and after first click */}
      {currentUser.email && menuWasOpened && (
        <div
          className={`header__menu_adaptable ${
            menu ? 'header__menu_active' : 'header__menu_inactive'
          }`}
        >
          <span className="header__user">{currentUser.email}</span>
          <span className="header__action" onClick={handleAction}>
            {action}
          </span>
        </div>
      )}
      <header className="header">
        <div className="header__content">
          <img src={logo} alt="Around the U.S logo" className="header__logo" />
          {currentUser.email ? (
            <>
              {/* Desktop menu hidden on mobile */}
              <div className="header__menu header__menu_invisible">
                <span className="header__user">{currentUser.email}</span>
                <span className="header__action" onClick={handleAction}>
                  {action}
                </span>
              </div>
              {/* Hamburger icon for mobile */}
              <img
                className="header__menu-icon"
                src={menuIcon}
                alt="Menu"
                onClick={handleMenuClick}
                style={{ cursor: 'pointer' }}
              />
            </>
          ) : (
            // Always show login/register menu when not logged in
            <div className="header__menu">
              <span className="header__action" onClick={handleAction}>
                {action}
              </span>
            </div>
          )}
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}
