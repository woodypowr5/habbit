import { Action } from '@ngrx/store';

import { UserData } from './userData.model';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';
export const SET_USER_DATA = '[Auth] Set User Data';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export class SetUserData implements Action {
  readonly type = SET_USER_DATA;

  constructor(public payload: UserData) {}
}

export type AuthActions =
  | SetAuthenticated
  | SetUnauthenticated
  | SetUserData;
