import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <h1 className="login__title">Log In</h1>
      <form className="login__form">
        <label className="login__form-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="login__input login__input_type_email"
            id="login-email"
            required
            minLength="2"
            maxLength="40"
            // value={title}
            // onChange={handleTitle}
          />
          <span className="login__input-error login__input-error_type_email"></span>
        </label>
        <label className="login__form-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="login__input login__input_type_password"
            id="login-password"
            required
            // value={imageUrl}
            // onChange={handleImageUrl}
          />
          <span className="login__input-error login__input-error_type_password"></span>
        </label>
        <button
          type="submit"
          className="login__button"
          id="login__button"
          //   onClick={handleClick}
        >
          Sign In
        </button>
        <p className="login__signup-text">
          Are you not a member?{' '}
          <Link to="/signup" className="register__login-link">
            Sign up here.
          </Link>
        </p>
      </form>
    </>
  );
}

export default Login;
