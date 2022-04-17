export const EMAIL_PATTERN = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
export const PHONE_NUMBER_PATTERN = /^\+?\d+$/;
export const FIREBASE_API_KEY = 'AIzaSyBqd8erqcC0Oe9fJ-KS2SNRB4eU1zRaBeo';
export const FIREBASE_SIGNIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`; //{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}
export const FIREBASE_SIGNUP = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_API_KEY}`; //{"email":"[user@example.com]","password":"[PASSWORD]","returnSecureToken":true}
export const FIREBASE_DATABASE = `https://phone-store-im-default-rtdb.firebaseio.com/`;
