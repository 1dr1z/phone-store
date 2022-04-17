import { createSlice } from '@reduxjs/toolkit';
import { countOneHourInFuture } from '../../Shared/utils/hour-in-future';
import {
  fetchUsersWithRoles,
  sendSignInRequestAction,
  sendSignUpRequestAction,
  storeUsersAndTheirRoles,
} from '../actions/auth-actions';

const logoutHelper = (state) => {
  state.isAuthenticated = false;
  state.jwtToken = null;
  state.userId = null;
  state.refreshToken = null;
  state.expiresAt = null;
  state.email = null;
  state.role = null;
  state.expiresAt = null;
  localStorage.clear();
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    jwtToken: null,
    userId: null,
    refreshToken: null,
    expiresAt: null,
    email: null,
    role: null,
  },
  reducers: {
    checkIfAuthenticated(state, action) {
      const authItem = JSON.parse(localStorage.getItem('auth'));
      if (authItem) {
        state.isAuthenticated = !!authItem.jwtToken;
        state.jwtToken = authItem.jwtToken;
        state.userId = authItem.userId;
        state.refreshToken = authItem.refreshToken;
        state.expiresAt = authItem.expiresAt;
        state.email = authItem.email;
        state.expiresAt = authItem.expiresAt;
        state.role = authItem.role;

        if (
          new Date(JSON.parse(state.expiresAt)).getTime() < new Date().getTime()
        ) {
          logoutHelper(state);
        }
      }
    },
    logout(state, action) {
      logoutHelper(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendSignInRequestAction.fulfilled, (state, action) => {
      state.isAuthenticated = !!action.payload?.idToken;
      state.jwtToken = action.payload.idToken;
      state.userId = action.payload.localId;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
      state.email = action.payload.email;
      state.expiresAt = JSON.stringify(countOneHourInFuture());
      localStorage.setItem(
        'auth',
        JSON.stringify({
          jwtToken: state.jwtToken,
          userId: state.userId,
          refreshToken: state.refreshToken,
          expiresIn: state.expiresIn,
          email: state.email,
          expiresAt: state.expiresAt,
        })
      );
    });

    builder.addCase(sendSignUpRequestAction.fulfilled, (state, action) => {
      state.isAuthenticated = !!action.payload?.idToken;
      state.jwtToken = action.payload.idToken;
      state.userId = action.payload.localId;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
      state.email = action.payload.email;
      state.expiresAt = JSON.stringify(countOneHourInFuture());
      state.role = action.payload.role;
      localStorage.setItem(
        'auth',
        JSON.stringify({
          jwtToken: state.jwtToken,
          userId: state.userId,
          refreshToken: state.refreshToken,
          expiresIn: state.expiresIn,
          email: state.email,
          expiresAt: state.expiresAt,
          role: state.role,
        })
      );
    });
    builder.addCase(sendSignUpRequestAction.rejected, (state, action) => {
      if (state.isAuthenticated) {
        state.isAuthenticated = false;
      }
    });
    builder.addCase(storeUsersAndTheirRoles.fulfilled, (state, action) => {
      state.role = action.payload.role;
    });
    builder.addCase(fetchUsersWithRoles.fulfilled, (state, action) => {
      for (const item in action.payload) {
        if (action.payload[item].userId === state.userId) {
          state.role = action.payload[item].role;
          const authState = JSON.parse(localStorage.getItem('auth'));
          if (authState) {
            const authToSave = {
              ...authState,
              role: action.payload[item].role,
            };
            localStorage.setItem('auth', JSON.stringify(authToSave));
          }
        }
      }
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
