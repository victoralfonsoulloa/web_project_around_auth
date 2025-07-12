import logo from '../../images/logo.png'

export default function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Around the U.S logo" className="header__logo" />
    </header>
  );
}
