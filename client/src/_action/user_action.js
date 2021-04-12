import axios from 'axios';
import { 
  LOGIN_USER
} from './types';

export function loginUser(dataToSubmit) {
  const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data );

  return{
    type: LOGIN_USER,
    payload: request
    // reducer에 보낸다.
  }
}

export function registerUser(dataToSubmit) {
  const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data );

  return{
    type: LOGIN_USER,
    payload: request
    // reducer에 보낸다.
  }
}

