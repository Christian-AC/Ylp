import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUp.css'

const SignUpForm = ({setShowModal}) => {

  let errorsObj = {content: ''};
  const [reactErrors, setReactErrors] = useState(errorsObj);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();

    let error = false;
    errorsObj = {...errorsObj};
    if(username === '') {
      errorsObj.username = "Requires username!";
      error = true;
    } else if (username.length < 5 || username.length > 20) {
      errorsObj.username = "Usernames must be longer than 5 characters and shorter than 20.";
      error = true;
    }
    if(email === '') {
      errorsObj.email = "Requires email!";
      error = true;
    } else if (!email.includes("@")) {
      errorsObj.email = "Please input a valid email address."
    }
    if(password === '') {
      errorsObj.password = "Requires password!";
      error = true;
    }
    if(repeatPassword === '') {
      errorsObj.repeatPassword = "Requires password!";
      error = true;
    } else if (repeatPassword !== password) {
      errorsObj.repeatPassword = "Passwords must match!";
      error = true;
    }

    setReactErrors(errorsObj);

    if(!error) {
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  }
}

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    setShowModal(false)
    return <Redirect to='/business' />;
  }

  return (
    <form className="signupform" onSubmit={onSignUp}>
      {Object.values(reactErrors).map((error, idx) => <li className='errors' key={idx}>{error}</li>)}
      <div>
        {errors.map((error, ind) => (
          <div className='errors' key={ind}>{error}</div>
        ))}
      </div>
      <div>
        <label>User Name</label>
        <input
          className='username-input'
          type='text'
          name='username'
          placeholder='username'
          onChange={updateUsername}
          value={username}
          required={true}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          className='email-input'
          type='text'
          name='email'
          placeholder='email'
          onChange={updateEmail}
          value={email}
          required={true}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          className='password-input'
          type='password'
          name='password'
          placeholder='password'
          onChange={updatePassword}
          value={password}
          required={true}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          className='repeat-password-input'
          type='password'
          name='repeat_password'
          placeholder='password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit' className="loginbutton">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
