import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = ({setShowModal}) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory()

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
    return <Redirect to='/business'/>;
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const DemoEmail = "demo@aa.io"
    const DemoPassword = "password"
    const data = await dispatch(login(DemoEmail, DemoPassword));
    if (data) {
      setErrors(data);
    }
    return <Redirect to='/business'/>;
  };

  if (user) {
    // setShowModal(false)
    return <Redirect to='/business'/>;
  }


  return (
    <div classname='login-form-container'>
      <form className="loginform" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input className='emailform'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
          className='password-sigup'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
          <div className='signup-button-container'>
            <button type='submit' className="loginbutton">Login</button>
            <button type='submit' className="loginbutton" onClick={demoUser}>Demo User</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
