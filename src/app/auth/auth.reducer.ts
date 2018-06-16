import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { UserData } from './userData.model';

import {
  AuthActions,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER_DATA
} from './auth.actions';

export interface State {
  isAuthenticated: boolean;
  userData: UserData;
}

const initialState: State = {
  isAuthenticated: false,
  userData: null
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true,
        userData: state.userData
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false,
        userData: state.userData
      };
    case SET_USER_DATA:
    return {
      ...state,
      userData: action.payload
    };
    default: {
      return state;
    }
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;
export const getUserData = (state: State) => state.userData;
