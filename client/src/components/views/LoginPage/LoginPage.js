import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {

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
