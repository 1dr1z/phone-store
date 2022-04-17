import axios from 'axios';
import { FIREBASE_SIGNIN, FIREBASE_SIGNUP } from '../Constants';

export const sendSignInRequest = (email, password) => {
  return axios.post(
    FIREBASE_SIGNIN,
    JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const sendSignUpRequest = (email, password) => {
  return axios.post(
    FIREBASE_SIGNUP,
    JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
