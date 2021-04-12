import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_action/user_action';
import './RegisterPage.css';

function RegisterPage(props) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const onNameHandler = (event) => {
    setName(event.target.value);
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.target.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // console.log('email: ', email); // server에 보낼 값들을 state에서 가지고 있는 것이다.
    // console.log('password: ', password);

    if(password !== confirmPassword) {
      return alert('Confirm password!');
    }

    let body = {
      email: email,
      password: password,
      name: name,

    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success) {
        props.history.push('/');
      } else {
        alert('error in Register Page');
      }
    })
    
  }

  return (
    <div className='registerPage'>
      <form className='loginPage__form' onSubmit={onSubmitHandler}>

        <label>E-Mail</label>
        <input type='email' value={email} onChange={onEmailHandler}/>

        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler}/>

        <label>Password</label>
        <input type='password' value={password} onChange={onPasswordHandler}/>

        <label>Confirm Password</label>
        <input type='password' value={confirmPassword} onChange={onConfirmPasswordHandler}/>

        <br/>
        <button>
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage;
