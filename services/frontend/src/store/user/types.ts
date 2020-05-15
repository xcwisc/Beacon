export interface SignInData {
  username: String,
  country: String,
  state: String,
  city: String
}

export interface UserState {
  isSignedIn: Boolean,
  data: SignInData
}


export const SIGNIN = 'SIGNIN';
export const SIGNOUT = 'SIGNOUT';

interface SignInAction {
  type: typeof SIGNIN,
  data: SignInData
}

interface SignOutAction {
  type: typeof SIGNOUT
}

export type UserActionTypes = SignInAction | SignOutAction;