import { EMAIL_PATTERN } from '../Constants';

export const checkIfFormIsValid = (email, password) => {
  if (EMAIL_PATTERN.test(email) && email !== '' && password !== '') {
    return true;
  } else {
    return false;
  }
};
