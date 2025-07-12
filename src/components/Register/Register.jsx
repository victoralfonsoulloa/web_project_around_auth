import React from 'react';

function Register() {
  return (
    <>
      <h1 className="signup__title">Register</h1>
      <form className="signup__form">
        <label className="signup__form-field">
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="signup__input signup__input_type_email"
            id="signup-email"
            required
            minLength="2"
            maxLength="40"
          />
          <span className="signup__input-error signup__input-error_type_email"></span>
        </label>
        <label className="signup__form-field">
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="signup__input signup__input_type_password"
            id="signup-password"
            required
          />
          <span className="signup__input-error signup__input-error_type_password"></span>
        </label>
        <button
          type="submit"
          className="signup__button"
          id="signup__button"
        >
          Sign Up
        </button>
        <p className="signup__login-text">Already a member? Log in here.</p>
      </form>
    </>
  );
}

export default Register;