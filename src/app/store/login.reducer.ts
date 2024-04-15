import { createReducer, on } from '@ngrx/store';
import { LoginResponse } from '../interfaces/login';
import { logInSuccess, logOut } from './login.actions';
import { state } from '@angular/animations';

const initialAuthState: LoginResponse = {
  result: '',
  message: '',
  data: {
    token: '',
  },
};

export const authReducer = createReducer(
  initialAuthState,
  on(logInSuccess, (state, action) => {
    return {
      result: action.loginResponse.result,
      message: action.loginResponse.message,
      data: {
        token: action.loginResponse.data.token,
      },
    };
  }),

  on(logOut, (state) => {
    return {
      ...state,
      result: 'bad',
    };
  })
);
