import React from 'react';

function Register() {
  return (
    <>
    <h1>Sign in</h1>
    <form>
      <label className="form__field">
        <input
          type="text"
          placeholder="Title"
          name="title"
          className="form__input form__input-name"
          id="title"
          required
          minlength="2"
          maxlength="40"
          value={title}
          onChange={handleTitle}
        />
        <span className="form__input-error title-error"></span>
      </label>
      <label className="form__field">
        <input
          type="url"
          placeholder="Image URL"
          name="image"
          className="form__input"
          id="imageUrl"
          pattern="https://.*"
          required
          value={imageUrl}
          onChange={handleImageUrl}
        />
        <span className="form__input-error imageUrl-error"></span>
      </label>
      <button
        type="button"
        className="form__button"
        id="form__button"
        onClick={handleClick}
      >
        Save
      </button>
    </form>
    </>
  );
}

export default Register;
