import React, { useState } from 'react';
import { shape } from 'prop-types';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);

  const inputValidation = () => {
    const validationArray = [];
    const minLength = 7;

    if (email.includes('@')) {
      validationArray.push(true);
    } else { validationArray.push(false); }
    if (email.includes('.com')) {
      validationArray.push(true);
    } else { validationArray.push(false); }
    if (password.length >= minLength) {
      validationArray.push(true);
    } else { validationArray.push(false); }
    const validation = validationArray.some((el) => el !== true);

    setDisabled(validation);
  };

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (email !== '' && password !== '') inputValidation();
  };

  const submit = () => {
    const userInfo = { email };
    if (!localStorage.mealsToken) localStorage.setItem('mealsToken', '1');
    if (!localStorage.cocktailsToken) localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(userInfo));

    history.push('/foods');
  };

  return (
    <>
      <h2>Login</h2>
      <label htmlFor="email">
        Email:
        <input
          data-testid="email-input"
          id="email"
          name="email"
          type="text"
          onChange={ handleChange }
          onKeyUp={ handleChange }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          data-testid="password-input"
          id="password"
          name="password"
          type="password"
          onChange={ handleChange }
          onKeyUp={ handleChange }
        />
      </label>
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ isDisabled }
        onClick={ submit }
      >
        Login
      </button>
    </>
  );
}

export default Login;

Login.propTypes = {
  history: shape,
}.isRequired;
