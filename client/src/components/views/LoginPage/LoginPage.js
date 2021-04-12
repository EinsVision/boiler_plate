import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action';
import './LoginPage.css';

function LoginPage(props) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log('email: ', email); // server에 보낼 값들을 state에서 가지고 있는 것이다.
    // console.log('password: ', password);

    let body = {
      email: email,
      password: password,
    }

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess) {
        props.history.push('/');
      } else {
        alert('error in Login Page');
      }
    })
    
  }

  return (
    <div className='loginPage'>
      <form className='loginPage__form' onSubmit={onSubmitHandler}>
        <label>E-Mail</label>
        <input type='email' value={email} onChange={onEmailHandler}/>

        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler}/>
        <br/>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
