import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import SignupModal from '../HomePage/signupModal';
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
    return <Redirect to='/'/>;
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
    return <Redirect to='/'/>;
  };

  if (user) {
    // setShowModal(false)
    return <Redirect to='/'/>;
  }


  return (
    <div className='login-form-container'>
      <div className="loginform-top">
        <h2 className='loginform-text-intro'>Login to YLP</h2>
      </div>
      <form className="loginform-form" onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className='errors' key={ind}>{error}</div>
          ))}
        </div>
        <div className='loginform-input-container'>
          <input
            className='loginform-inputs'
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
          />
          <input
            className='loginform-inputs'
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className='signup-button-container'>
          <button type='submit' className="signup-bottons">Login</button>
          <button type='submit' className="signup-bottons" onClick={demoUser}>Demo User</button>
        </div>
      </form>
      <div className="loginform-bottom">
        <h3 className='loginform-text-new'>New to Ylp? <SignupModal/></h3>
      </div>
    </div>
  );
};

export default LoginForm;
