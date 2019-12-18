export interface UserState {
  isSignedIn: Boolean
}

export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';

interface SignInAction {
  type: typeof SIGNIN
}

interface SignOutAction {
  type: typeof SIGNOUT
}

export type UserActionTypes = SignInAction | SignOutAction;