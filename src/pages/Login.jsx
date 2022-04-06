import React, { useState, useRef, useEffect } from 'react';
import { shape } from 'prop-types';
import '../CSS/Login.css';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const myRef = useRef(null);
  const time = 4000;

  useEffect(() => {
    setTimeout(() => myRef.current.scrollIntoView({ behavior: 'smooth' }), time);
  }, []);

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
    <div className="login-page">
      <h1 className="login-title">CookTuille</h1>
      <img className="gif" src="https://media.giphy.com/media/xKggUfdA60O6A/giphy.gif" alt="gif ratatuille" />
      <div className="blur">
        <h2 className="login-title2" ref={ myRef }>Login</h2>
        <label htmlFor="email" className="login-label">
          Email:
          <input
            data-testid="email-input"
            id="email"
            name="email"
            type="text"
            onChange={ handleChange }
            onKeyUp={ handleChange }
            className="login-input"
          />
        </label>
        <label htmlFor="password" className="login-label">
          Senha:
          <input
            data-testid="password-input"
            id="password"
            name="password"
            type="password"
            onChange={ handleChange }
            onKeyUp={ handleChange }
            className="login-input"
          />
        </label>
        <button
          data-testid="login-submit-btn"
          type="button"
          disabled={ isDisabled }
          onClick={ submit }
          className="btn"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;

Login.propTypes = {
  history: shape,
}.isRequired;
